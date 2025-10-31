import { connection } from "next/server";
import { Shift } from "./components/shift";
import { getAvailableShifts,  } from "./actions";
import { SearchControls } from "./components/search-controls";
import { extractNumericFilter, extractDateFilter } from "@/lib/search-utils";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ShiftFilter = UnwrapPromise<Parameters<typeof getAvailableShifts>[0]>;
type ShiftSort = UnwrapPromise<Parameters<typeof getAvailableShifts>[1]>;




export function getShiftsQueryFromParams(searchParams: {
  [key: string]: string | string[] | undefined;
}): { filter: ShiftFilter; sort: ShiftSort } {
  const sortOptions = ["hourlyRateCents", "status", "startsAt"] as const;
  let sort: ShiftSort | undefined = undefined;
  if (
    searchParams.sortBy &&
    sortOptions.includes(searchParams.sortBy as (typeof sortOptions)[number])
  ) {
    const field = searchParams.sortBy as keyof ShiftSort;
    const direction = searchParams.sortDirection === "desc" ? "desc" : "asc";
    sort = { field, direction };
  }

  const filter: ShiftFilter = {
    rate: extractNumericFilter(searchParams.rate as string | undefined),
    date: extractDateFilter(searchParams.date as string | undefined),
    status: ["OPEN", "CANCELLED"].includes(searchParams.status as string)
      ? (searchParams.status as "OPEN" | "CANCELLED")
      : undefined,
  };

  return {
    sort,
    filter,
  };
}

export default async function Shifts({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await connection();
  const query = getShiftsQueryFromParams(await searchParams);
  // TODO: add pagination or infinite scrolling
  const result = await getAvailableShifts(query.filter, query.sort);
  if (!result.ok) {
    return <div>Failed to load shifts</div>;
  }

  const shifts = result.value;

  return (
    <div className="flex flex-col h-full w-full max-w-full scroll-auto">
      <header className="text-center w-full text-6xl text-blue-800">Browse Shifts</header>
      <SearchControls />
      <section className="flex flex-row flex-wrap justify-between gap-4 ">
        {!shifts.length ? <div>No shifts were found</div> : null}
        {shifts.map((x) => (
          <Shift key={x.id} shift={x} applied={x.applied} />
        ))}
      </section>
    </div>
  );
}
