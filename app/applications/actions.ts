"use server";
import { ApplicationModel, ShiftModel } from "@/generated/prisma/models";
import prisma from "@/lib/db";
import { Result } from "@/lib/types";
import { getSignedInUserId } from "../actions/session";

type ApplicationSummary = ApplicationModel & {
  shift: ShiftModel;
};

export async function getApplications(): Promise<
  Result<ApplicationSummary[], string>
> {
  const userId = await getSignedInUserId();
  if (!userId) {
    return { ok: false, error: "User not signed in." };
  }

  try {
    const applications = await prisma.application.findMany({
      where: { userId },
      include: {
        shift: true,
      },
    });
    return { ok: true, value: applications };
  } catch (error) {
    console.error("Error fetching applications:", error);
    return { ok: false, error: "Failed to fetch applications." };
  }
}
