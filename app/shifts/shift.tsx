"use client";
import Link from "next/link";
import { ShiftSummary } from "./types";
import { useShiftActions } from "./hooks";
import { LocationIcon } from "../icons/location";
import { CalendarIcon } from "../icons/calendar";
import { ClockIcon } from "../icons/clock";
import { formatDateAndHours, formatShiftTime } from "@/lib/dateUtils";

export function Shift({
  shift,
  applied,
}: {
  shift: ShiftSummary;
  applied: boolean;
}) {
  const {
    loading,
    apply: onApplyClick,
    withdraw: onWithdrawClick,
  } = useShiftActions(shift.id);

  return (
    <article className="border border-blue rounded-xl p-4 m-4 border-blue-400">
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
      {applied ? (
        <span className=" block text-center bg-green-300 p-1 rounded-xl border border-green-800 m-1">
          Applied
        </span>
      ) : null}
      <footer className="border-t mt-2 pt-2 border-gray-200 text-right w-full ">
        {!applied ? (
          <button
            disabled={loading}
            className="border text-white bg-blue-700 p-2 min-w-20 border-white rounded-lg hover:bg-blue-400 hover:shadow-md active:shadow-none cursor-pointer"
            onClick={onApplyClick}
          >
            Apply
          </button>
        ) : (
          <button
            className="border text-white bg-blue-700 p-2 min-w-20 border-white rounded-lg hover:bg-blue-400  hover:shadow-md active:shadow-none cursor-pointer"
            onClick={onWithdrawClick}
          >
            Withdraw
          </button>
        )}
      </footer>
    </article>
  );
}
