"use client";
import { ShiftModel } from "@/generated/prisma/models";
import { useShiftActions } from "../hooks";
import { LocationIcon } from "@/app/icons/location";
import { CalendarIcon } from "@/app/icons/calendar";
import { ClockIcon } from "@/app/icons/clock";
import { formatDateAndHours, formatShiftTime } from "@/lib/dateUtils";
import Link from "next/link";
import { MoneyIcon } from "@/app/icons/money";
import { StatusIcon } from "@/app/icons/status";

export function ShiftDetail({
  shift,
  applied,
  hired,
}: {
  shift: ShiftModel;
  applied: boolean;
  hired: boolean;
}) {
  const {
    apply: onApplyClick,
    withdraw: onWithdrawClick,
    loading,
  } = useShiftActions(shift.id);
  return (
    <section className="w-full h-full max-w-full">
      <Link
        className="text-left hover:underline text-blue-600 hover:text-blue-400"
        href={"/shifts"}
      >
        Go back
      </Link>
      <header className="text-6xl text-center text-blue-900">
        {shift.title}
      </header>
      <article className="border border-blue-200 rounded-2xl p-4 mt-4">
        <dl className="text-sm flex flex-row justify-between text-blue-900">
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
          <dd className="items-center flex flex-row gap-2 mt-1">
            <StatusIcon
              width={32}
              height={32}
              className="bg-blue-100 rounded-2xl p-1"
            />
            {shift.status === "HIRED"
              ? // if shift status is HIRED, but the summary hired flag is not set, it means someone else was hired for this shift
                hired
                ? "HIRED"
                : "UNAVAILABLE"
              : shift.status}
          </dd>
          <dd className="items-center flex flex-row text-lg gap-2">
            <MoneyIcon
              width={32}
              height={32}
              className="bg-blue-100 rounded-2xl p-1"
            />
            {/* For money related calculations a library like decimal.js should be used in a production application, 
      to avoid rounding errors associted with floating point arithmetics. I'll leave it like this for simplicity's sake. */}
            <span>${(shift.hourlyRateCents / 100).toFixed(2)}/hr</span>
          </dd>
        </dl>
      </article>
      <article className="mt-4">{shift.description}</article>
      <footer className="flex flex-row justify-between border-t mt-2 pt-2 border-gray-200 text-right w-full ">
        {applied ? (
          <span className="blockw-20 text-center bg-green-300 p-1 rounded-xl border border-green-800 m-1">
            Applied
          </span>
        ) : (
          <span />
        )}
        {!applied ? (
          <button
            disabled={loading || shift.status !== "OPEN"}
            className="border block disabled:bg-gray-500 disabled:cursor-default text-white bg-blue-700 p-2 min-w-20 border-white rounded-lg hover:bg-blue-400 hover:not:disabled:shadow-md active:not:disabled:shadow-none cursor-pointer"
            onClick={onApplyClick}
          >
            Apply
          </button>
        ) : (
          <button
            disabled={loading || shift.status !== "OPEN"}
            className="border block disabled:bg-gray-500 disabled:cursor-default text-white bg-blue-700 p-2 min-w-20 border-white rounded-lg hover:bg-blue-400 hover:not:disabled:shadow-md active:not:disabled:shadow-none cursor-pointer"
            onClick={onWithdrawClick}
          >
            Withdraw
          </button>
        )}
      </footer>
    </section>
  );
}
