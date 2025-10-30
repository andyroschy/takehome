"use client";
import Link from "next/link";
import { ShiftSummary } from "./types";
import { useShiftActions } from "./hooks";

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

      <dl>
        <dd>
          <span>{shift.facilityName}</span>
          <span>{shift.location}</span>
        </dd>
        <dd>
          {shift.startsAt.toLocaleString()}
          {shift.endsAt.toLocaleString()}
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
