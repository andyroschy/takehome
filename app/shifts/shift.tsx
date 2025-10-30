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
    <div>
      <Link href={`shifts/${shift.id}`}>
        <h1>{shift.title}</h1>
      </Link>
      <span>Facility:</span>
      <span>{shift.facilityName}</span>
      <span>Hourly Rate:</span>
      {/* For money related calculations a library like decimal.js should be used in a production application, 
      to avoid rounding errors associted with floating point arithmetics. I'll leave it like this for simplicity's sake. */}
      <span>${(shift.hourlyRateCents / 100).toFixed(2)} </span>
      <span>From:</span>
      {shift.startsAt.toLocaleString()}
      <span>To:</span>
      {shift.endsAt.toLocaleString()}
      <span>Location:</span>
      {shift.location}
      <span>Status:</span>
      {shift.status}
      {applied ? <span>Already applied!</span> : null}
      {!applied ? (
        <button
          disabled={loading}
          className="border border-white rounded-xl cursor-pointer"
          onClick={onApplyClick}
        >
          Apply
        </button>
      ) : (
        <button
          className="border border-white rounded-xl cursor-pointer"
          onClick={onWithdrawClick}
        >
          Withdraw
        </button>
      )}
    </div>
  );
}
