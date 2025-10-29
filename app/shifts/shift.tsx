'use client'
import { Shift as ShiftModel } from "@/generated/prisma/client";

export function Shift({
  shift,
  applied,
}: {
  shift: Pick<
    ShiftModel,
    "title" | "facilityName" | "hourlyRateCents" | "location" | "status"
  >;
  applied: boolean;
}) {
  return (
    <div>
      <h1>{shift.title}</h1>
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
        <button className="border border-white rounded-xl cursor-pointer" onClick={() => alert("applied!")}>Apply</button>
      ) : (
        <button onClick={() => alert("withdrawed")}>Withdraw</button>
      )}
    </div>
  );
}
