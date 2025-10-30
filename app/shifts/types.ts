import { ShiftModel } from "@/generated/prisma/models";

export type ShiftSummary = Pick<
    ShiftModel,
    "id" | "title" | "facilityName" | "hourlyRateCents" | "location" | "status"
  > & { applied: boolean};