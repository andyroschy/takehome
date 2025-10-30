import prisma from "@/lib/db";
import { connection } from "next/server";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const shift = await prisma.shift.findUnique({
    where: { id },
    select: {
      applications: false,
      description: true,
      facilityName: true,
      hourlyRateCents: true,
      id: true,
      location: true,
      status: true,
      title: true,
    }
  });

  return <div>{JSON.stringify(shift)}</div>;
}
