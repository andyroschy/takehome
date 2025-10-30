'use server';
import prisma from "@/lib/db";
import { Maybe, Result } from "@/lib/types";
import { getCurrentUserId } from "@/lib/users";
import { ShiftSummary } from "./types";
import { revalidatePath } from "next/cache";

export async function applyToShift(shiftId: string): Promise<Maybe<string>> {
  const userId = getCurrentUserId();

  try {
    await prisma.application.create({
      data: {
        shiftId,
        userId,
        createdAt: new Date(),
        status: "APPLIED",
      },
    });
    revalidatePath('/shifts');
    return { ok: true };
  } catch (error) {
    console.log("Error applying to shift:", error);
    return { ok: false, error: "Failed to apply to shift." };
  }
}

export async function getAvailableShifts(): Promise<
  Result<ShiftSummary[], string>
> {
  const userId: string = getCurrentUserId();
  const shifts = await prisma.shift.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      facilityName: true,
      status: true,
      hourlyRateCents: true,
      applications: {
        where: {
          userId: userId,
        },
      },
    },
    where: {
      status: "OPEN",
    },
  });
  return {
    ok: true,
    value: shifts.map((shift) => ({
      ...shift,
      applied: shift.applications.length > 0,
    })),
  };
}
