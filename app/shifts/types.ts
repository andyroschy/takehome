import { ShiftModel } from "@/generated/prisma/models";

export type ShiftSummary = Pick<
    ShiftModel,
    "id" | "title" | "facilityName" | "hourlyRateCents" | "location" | "status" | "startsAt" | "endsAt"
  > & { applied: boolean, hired: boolean};