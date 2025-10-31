"use server";
import prisma from "@/lib/db";
import { Maybe, Result } from "@/lib/types";
import { ShiftSummary } from "./types";
import { revalidatePath } from "next/cache";
import { getSignedInUserId } from "../actions/session";
import { OrdinalFilter } from "@/lib/search-utils";

export async function applyToShift(shiftId: string): Promise<Maybe<string>> {
  const userId = await getSignedInUserId();

  if (!userId) {
    return { ok: false, error: "User not signed in." };
  }

  try {
    // SINCE WE ARE USING UPSERT THERE'S NO NEED TO VALIDATE IF USER ALREADY APPLIED TO SHIFT
    // DUPLICATE APPLICATION WILL SIMPLY UPDATE THE TIMESTAMP
    await prisma.application.upsert({
      create: {
        shiftId,
        userId,
        createdAt: new Date(),
        status: "APPLIED",
      },
      update: {
        createdAt: new Date(),
        status: "APPLIED",
      },
      where: {
        shiftId_userId: {
          shiftId,
          userId,
        },
      },
    });
    revalidatePath("/shifts");
    revalidatePath("/applications");
    return { ok: true };
  } catch (error) {
    console.log("Error applying to shift:", error);
    return { ok: false, error: "Failed to apply to shift." };
  }
}

export async function withdrawFromShift(
  shiftId: string
): Promise<Maybe<string>> {
  const userId = await getSignedInUserId();

  if (!userId) {
    return { ok: false, error: "User not signed in." };
  }

  try {
    await prisma.application.update({
      where: {
        shiftId_userId: {
          shiftId,
          userId,
        },
      },
      data: {
        status: "WITHDRAWN",
      },
    });
    revalidatePath("/shifts");
    return { ok: true };
  } catch (error) {
    console.log("Error withdrawing from shift:", error);
    return { ok: false, error: "Failed to withdraw from shift." };
  }
}

type SortOption<T, K extends keyof T> = {
  field: K;
  direction: "asc" | "desc";
};

export async function getAvailableShifts(
  filter: {
    status?: "OPEN" | "CANCELLED";
    rate?: OrdinalFilter<number>;
    date?: OrdinalFilter<Date>;
  } = {},
  sort:
    | SortOption<ShiftSummary, "hourlyRateCents" | "status">
    | undefined = undefined
): Promise<Result<ShiftSummary[], string>> {
  const userId = await getSignedInUserId();
  if (!userId) {
    return { ok: false, error: "User not signed in." };
  }

  const rateFilter = filter.rate
    ? {
        [filter.rate.operator]: filter.rate.value,
      }
    : undefined;

  const dateFilter = filter.date
    ? {
        [filter.date.operator]: filter.date.value,
      }
    : undefined;

  const orderBy = sort
    ? { [sort.field]: sort.direction }
    : { startsAt: "asc" as const };

  const shifts = await prisma.shift.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      facilityName: true,
      status: true,
      hourlyRateCents: true,
      startsAt: true,
      endsAt: true,
      applications: {
        where: {
          userId: userId,
          status: "APPLIED",
        },
      },
    },
    where: {
      status: filter.status ?? undefined,
      hourlyRateCents: rateFilter,
      startsAt: dateFilter,
    },
    orderBy: orderBy,
  });
  return {
    ok: true,
    value: shifts.map((shift) => ({
      ...shift,
      applied: shift.applications.length > 0,
    })),
  };
}
