"use client";
import Link from "next/link";
import { ShiftSummary } from "./types";
import { useCallback, useState } from "react";
import { applyToShift, withdrawFromShift } from "./actions";

export function Shift({
  shift,
  applied,
}: {
  shift: ShiftSummary;
  applied: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const onApplyClick = useCallback(async () => {
    setLoading(true);
    const respone = await applyToShift(shift.id);
    if (!respone.ok) {
      // in a real application this would be a toast notifiaction or somethig
      alert("Failed to apply to shift: " + respone.error);
    }
    setLoading(false);
  }, [shift.id]);

   const onWithdrawClick = useCallback(async () => {
    setLoading(true);
    const respone = await withdrawFromShift(shift.id);
    if (!respone.ok) {
      // in a real application this would be a toast notifiaction or somethig
      alert("Failed to withdraw to shift: " + respone.error);
    }
    setLoading(false);
  }, [shift.id]);

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
      {/* {shift.startsAt.toLocaleString()} */}
      <span>To:</span>
      {/* {shift.startsAt.toLocaleString()} */}
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
        <button className="border border-white rounded-xl cursor-pointer" onClick={onWithdrawClick}>Withdraw</button>
      )}
    </div>
  );
}
