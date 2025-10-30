export function formatDateAndHours(startDate: Date, endDate: Date): string {
  const date = startDate
    .toLocaleDateString(undefined, {
      month: "short",
      day: "2-digit",
    })
    .replace(" ", ", ");

  const hours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  return `${date} • ${hours} hrs`;
}

export function formatShiftTime(startDate: Date, endDate: Date): string {
  const startTime = startDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTime = endDate.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${startTime} to ${endTime}`;
}
