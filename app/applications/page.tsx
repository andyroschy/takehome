import { connection } from "next/server";
import { getApplications } from "./actions";
import Link from "next/link";
import { LocationIcon } from "../icons/location";
import { CalendarIcon } from "../icons/calendar";
import { formatDateAndHours, formatShiftTime } from "@/lib/dateUtils";
import { ClockIcon } from "../icons/clock";
import { ApplicationStatus } from "@/generated/prisma/enums";

const statusStyles: Record<ApplicationStatus, string> = {
  ["APPLIED"]: "bg-green-200 border-green-600 text-green-800",
  ["WITHDRAWN"]: "bg-gray-200 border-gray-600 text-gray-800",
  ["REJECTED"]: "bg-red-200 border-red-600 text-red-800",
  ["HIRED"]: "bg-green-200 border-green-600 text-green-800",
};

export default async function Applications() {
  await connection();
  const result = await getApplications();
  if (!result.ok) {
    return <div>Error fetching applications</div>;
  }

  const applications = result.value;

  return (
    <section className="flex flex-row flex-wrap">
      {!applications.length && (
        <div>
          You don&apos;t have any applicatoins yet. Apply to a{" "}
          <Link href={"/shifts"}>shift</Link>
        </div>
      )}
      <header className="text-center w-full text-6xl text-blue-800">My Applications</header>
      {applications.map(({ shift, status }) => (
        <article
          key={shift.id}
          className="border border-blue rounded-xl p-4 m-4 border-blue-400 min-w-100"
        >
          <header className="text-blue-900 font-bold flex justify-between">
            <Link href={`shifts/${shift.id}`}>{shift.title}</Link>
            {/* For money related calculations a library like decimal.js should be used in a production application, 
      to avoid rounding errors associted with floating point arithmetics. I'll leave it like this for simplicity's sake. */}
            <span>${(shift.hourlyRateCents / 100).toFixed(2)}/hr</span>
          </header>

          <dl className="text-sm text-blue-900">
            <dd className="items-center flex flex-row gap-2 mt-1">
              <LocationIcon
                width={32}
                height={32}
                className="bg-blue-100 rounded-2xl p-1 mt-1"
              />
              <div className="inline-block">
                <b className="text-sm">{shift.facilityName}</b>
                <br />
                <span>{shift.location}</span>
              </div>
            </dd>
            <dd className="items-center flex flex-row gap-2 mt-1">
              <CalendarIcon
                width={32}
                height={32}
                className="bg-blue-100 rounded-2xl p-1"
              />

              {formatDateAndHours(shift.startsAt, shift.endsAt)}
            </dd>
            <dd className="items-center flex flex-row gap-2 mt-1">
              <ClockIcon
                width={32}
                height={32}
                className="bg-blue-100 rounded-2xl p-1"
              />
              {formatShiftTime(shift.startsAt, shift.endsAt)}
            </dd>
          </dl>
          <span
            className={`rounded-xl block text-center mt-2 border p-1 ${statusStyles[status]}`}
          >
            {status}
          </span>
        </article>
      ))}
    </section>
  );
}
