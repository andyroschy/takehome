"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEventHandler } from "react";

export function QueryControls() {
  return (
    <section className="flex flex-row justify-between w-full">
      <article>
        Filter:
        <form className="flex flex-row gap-4 justify-center my-4">
          <div>
            <label htmlFor="rate">Rate</label>
            <OperatorSelect onChange={() => null}></OperatorSelect>
            <input
              className="w-40 border border-blue-400 rounded-xl"
              name="rate"
              onChange={undefined}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <OperatorSelect onChange={() => null}></OperatorSelect>
            <input
              name="date"
              className="w-40 border border-blue-400 rounded-xl"
              onChange={undefined}
            ></input>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select className="w-40 border border-blue-400 rounded-xl">
              <option value="OPEN">OPEN</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="">ANY</option>
            </select>
          </div>
        </form>
      </article>
      <article>
        Sort by:
        <menu className="flex flex-row gap-4 justify-center my-4">
          <SortOption label="Rate" field="hourlyRateCents" />
          <SortOption label="Status" field="status" />
          <SortOption label="Date" field="startsAt" />
        </menu>
      </article>
    </section>
  );
}

function SortOption({ label, field }: { label: string; field: string }) {
  const searchParams = useSearchParams();

  let direction = "asc";
  if (searchParams.get("sortBy") === field) {
    direction = searchParams.get("sortDirection") === "asc" ? "desc" : "asc";
  }

  return (
    <li>
      <Link href={`/shifts?sortBy=${field}&sortDirection=${direction}`}>
        {direction === "asc" ? "↓" : "↑"}
        {label}
      </Link>
    </li>
  );
}

function OperatorSelect({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
}) {
  return (
    <select
      onChange={onChange}
      className="border border-blue-400 rounded-lg p-1"
    >
      <option value="gt">&gt;</option>
      <option value="lt">&lt;</option>
      <option value="equals">=</option>
    </select>
  );
}
