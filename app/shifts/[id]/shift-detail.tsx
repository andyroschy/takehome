"use client";
import { ShiftModel } from "@/generated/prisma/models";
import { useShiftActions } from "../hooks";

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
    <div>
      {JSON.stringify(shift)}
      {!applied ? (
        <button disabled={loading} onClick={onApplyClick}>
          Apply
        </button>
      ) : (
        <button disabled={loading} onClick={onWithdrawClick}>
          Withdraw
        </button>
      )}
    </div>
  );
}
