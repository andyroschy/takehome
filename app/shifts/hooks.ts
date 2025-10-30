import { useCallback, useState } from "react";
import { applyToShift, withdrawFromShift } from "./actions";

export function useShiftActions(shiftId: string) {
  const [loading, setLoading] = useState(false);
  const apply = useCallback(async () => {
    setLoading(true);
    const respone = await applyToShift(shiftId);
    if (!respone.ok) {
      // in a real application this would be a toast notifiaction or somethig
      alert("Failed to apply to shift: " + respone.error);
    }
    setLoading(false);
  }, [shiftId]);

  const withdraw = useCallback(async () => {
    setLoading(true);
    const respone = await withdrawFromShift(shiftId);
    if (!respone.ok) {
      // in a real application this would be a toast notifiaction or somethig
      alert("Failed to withdraw to shift: " + respone.error);
    }
    setLoading(false);
  }, [shiftId]);

  return {
    apply,
    withdraw,
    loading,
  };
}
