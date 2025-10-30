"use client";
import { ShiftModel } from "@/generated/prisma/models";
import { useShiftActions } from "../hooks";
import { LocationIcon } from "@/app/icons/location";
import { CalendarIcon } from "@/app/icons/calendar";
import { ClockIcon } from "@/app/icons/clock";
import { formatDateAndHours, formatShiftTime } from "@/lib/dateUtils";
import Link from "next/link";

export function ShiftDetail({
  shift,
  applied,
}: {
  shift: ShiftModel;
  applied: boolean;
}) {
  const {
    apply: onApplyClick,
    withdraw: onWithdrawClick,
    loading,
  } = useShiftActions(shift.id);
  return (
    <section className="w-full h-full max-w-full">
      <Link className="text-left hover:underline text-blue-600 hover:text-blue-400" href={"/shifts"}>
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
            disabled={loading}
            className="border block text-white bg-blue-700 p-2 min-w-20 border-white rounded-lg hover:bg-blue-400 hover:shadow-md active:shadow-none cursor-pointer"
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
    </section>
  );
}
