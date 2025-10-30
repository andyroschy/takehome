import { connection } from "next/server";
import { Shift } from "./shift";
import { getAvailableShifts } from "./actions";

export default async function Shifts() {
  await connection();
  const result = await getAvailableShifts();
  if (!result.ok) {
    return <div>Failed to load shifts</div>;
  }

  const shifts = result.value;

  return (
    <div>
      {!shifts.length ? <div>There are no shifts availabe</div> : null}
      {shifts.map((x) => (
        <Shift key={x.id} shift={x} applied={x.applied} />
      ))}
    </div>
  );
}
