"use client";
import { extractDateFilter, extractNumericFilter } from "@/lib/search-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "../icons/mangnifying-glass";
import { useRouter } from "next/navigation";

export function QueryControls() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const path = usePathname();

  const stauts = searchParams.get("status") || "";
  const rate = extractNumericFilter(searchParams.get("rate") || "");
  const date = extractDateFilter(searchParams.get("rate") || "");

  const [inputValues, setInputValues] = useState({
    status: searchParams.get("status"),
    rate: rate?.value ? (rate?.value / 100).toFixed(2) : "",
    rateOperator: rate?.operator ?? 'equals',
    date: date?.value.toDateString() ?? "",
    dateOperator: date?.operator ?? 'equals',
  });

  const onInputChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = e.target;
      setInputValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onSearchHandler = () => {
    const params = new URLSearchParams();
    if (inputValues.rate) {
      params.set(
        "rate",
        `${inputValues.rateOperator ?? "equals"}:${Math.round(
          parseFloat(inputValues.rate) * 100
        )}`
      );
    }

    if (inputValues.date) {
      params.set(
        "date",
        `${inputValues.dateOperator ?? "equals"}:${inputValues.date}`
      );
    }

    router.push(`${path}?${params.toString()}`);
  };

  const onClearHandler = () => {
    router.push(path);
    setInputValues({
      date: '',
      dateOperator: 'equals',
      rate: '',
      rateOperator: 'equals',
      status: ''
    });
  };

  return (
    <section className="flex flex-row justify-between w-full">
      <article>
        Filter:
        <form
          className="flex flex-row gap-4 justify-center my-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="rate">Rate</label>
            <OperatorSelect
              value={inputValues.rateOperator ?? "equals"}
              field="rate"
              onChange={onInputChangeHandler}
            ></OperatorSelect>
            <input
              className="w-40 border border-blue-400 rounded-xl"
              name="rate"
              type="number"
              onChange={onInputChangeHandler}
              value={inputValues.rate ?? ""}
            ></input>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <OperatorSelect
              value={inputValues.dateOperator ?? "equals"}
              field="date"
              onChange={onInputChangeHandler}
            ></OperatorSelect>
            <input
              name="date"
              className="w-40 border border-blue-400 rounded-xl"
              type="date"
              value={inputValues.date ?? ""}
              onChange={onInputChangeHandler}
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
          <button
            onClick={onSearchHandler}
            className="cursor-pointer  transition-colors hover:bg-blue-300 border border-blue-200 rounded-4xl p-2"
          >
            <MagnifyingGlassIcon height={16} width={16} />
          </button>
          <button
            onClick={onClearHandler}
            className="cursor-pointer  transition-colors hover:bg-blue-300 border border-blue-200 rounded-4xl "
          >
            x
          </button>
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
  field,
  value,
}: {
  onChange: ChangeEventHandler<HTMLSelectElement> | undefined;
  field: string;
  value: string;
}) {
  return (
    <select
      onChange={onChange}
      value={value}
      name={`${field}Operator`}
      className="border border-blue-400 rounded-lg p-1"
    >
      <option value="gt">&gt;</option>
      <option value="lt">&lt;</option>
      <option value="equals">=</option>
    </select>
  );
}
