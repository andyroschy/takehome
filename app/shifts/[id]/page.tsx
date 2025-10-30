import prisma from "@/lib/db";
import { connection } from "next/server";
import { ShiftDetail } from "./shift-detail";
import { redirect } from "next/navigation";
import { getSignedInUserId } from "@/app/actions/session";

export default async function Detail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();

  const { id } = await params;
  const shift = await prisma.shift.findUnique({
    where: { id },
    include: {
      applications: {
        where: {
          userId: (await getSignedInUserId()) ?? undefined,
          status: "APPLIED",
        },
      },
    },
  });

  if (!shift) {
    return redirect("/shifts");
  }

  return <ShiftDetail shift={shift} applied={shift.applications.length > 0} />;
}
