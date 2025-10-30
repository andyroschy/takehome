import { connection } from "next/server";
import { getApplications } from "./actions";

export default async function Applications() {
  await connection();
  const result = await getApplications();
  if (!result.ok) {
    return <div>Error fetching applications</div>;
  }

  const applications = result.value;

  return (
    <div>
      {applications.map((a) => (
        <div key={a.id}>{a.status}
        <div>{JSON.stringify(a.shift)}</div>
        </div>
      ))}
    </div>
  );
}
