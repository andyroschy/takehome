import prisma from "@/lib/db";
import { connection } from "next/server";
import { Shift } from "./shift";

export default async function Shifts() {
  await connection();
  const shifts = await prisma.shift.findMany({
    select: {
      id: true,
      title: true,
      location: true,
      facilityName: true,
      status: true,
      hourlyRateCents: true,
    },
  });
  return (
    <div>
      {!shifts.length ? <div>There are no shifts availabe</div> : null}
      {shifts.map((x) => (
        <Shift key={x.id} shift={x} applied={false} />
      ))}
    </div>
  );
}
