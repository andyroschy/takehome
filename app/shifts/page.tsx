import { connection } from "next/server";
import { Shift } from "./shift";
import { getAvailableShifts, OrdinalFilter } from "./actions";
import { QueryControls } from "./query-controls";

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type ShiftFilter = UnwrapPromise<Parameters<typeof getAvailableShifts>[0]>;
type ShiftSort = UnwrapPromise<Parameters<typeof getAvailableShifts>[1]>;

// TODO: Move to lib/query.ts
function extractNumericFilter(
  query: string | undefined
): OrdinalFilter<number> | undefined {
  if (!query) {
    return undefined;
  }

  const validOperatos = ["gt", "lt", "equals"];
  const [operator, value] = query.split(":");
  if (!validOperatos.includes(operator) || isNaN(Number(value))) {
    return undefined;
  }

  return {
    operator: operator as "gt" | "lt" | "equals",
    value: Number(value),
  };
}

function extractDateFilter(
  query: string | undefined
): OrdinalFilter<Date> | undefined {
  if (!query) {
    return undefined;
  }

  const validOperatos = ["gt", "lt", "equals"];
  const [operator, value] = query.split(":");

  const dateValue = Date.parse(value);
  if (!validOperatos.includes(operator) || isNaN(dateValue)) {
    return undefined;
  }

  return {
    operator: operator as "gt" | "lt" | "equals",
    value: new Date(Date.parse(value)),
  };
}

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
    <>
      <header className="text-center w-full text-6xl text-blue-800">Browse Shifts</header>
      <QueryControls />
      <section className="flex flex-row flex-wrap ">
        {!shifts.length ? <div>There are no shifts availabe</div> : null}
        {shifts.map((x) => (
          <Shift key={x.id} shift={x} applied={x.applied} />
        ))}
      </section>
    </>
  );
}
