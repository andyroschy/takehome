"use client";
import { extractDateFilter, extractNumericFilter } from "@/lib/search-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChangeEvent, ChangeEventHandler, useCallback, useState } from "react";
import { MagnifyingGlassIcon } from "../icons/mangnifying-glass";
import { useRouter } from "next/navigation";

export function SearchControls() {
  const searchParams = useSearchParams();

  const router = useRouter();
  const path = usePathname();

  const status = searchParams.get("status");
  const rate = extractNumericFilter(searchParams.get("rate") || "");
  const date = extractDateFilter(searchParams.get("rate") || "");

  const [inputValues, setInputValues] = useState({
    status: status ?? "",
    rate: rate?.value ? (rate?.value / 100).toFixed(2) : "",
    rateOperator: rate?.operator ?? "equals",
    date: date?.value.toDateString() ?? "",
    dateOperator: date?.operator ?? "equals",
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
    const params = new URLSearchParams(searchParams);
    if (inputValues.rate) {
      params.set(
        "rate",
        `${inputValues.rateOperator ?? "equals"}:${Math.round(
          parseFloat(inputValues.rate) * 100
        )}`
      );
    } else {
      params.delete("rate");
    }

    if (inputValues.date) {
      params.set(
        "date",
        `${inputValues.dateOperator ?? "equals"}:${inputValues.date}`
      );
    } else {
      params.delete("date");
    }

    if (inputValues.status) {
      params.set("status", inputValues.status);
    } else {
      params.delete("status");
    }

    router.push(`${path}?${params.toString()}`);
  };

  const onClearHandler = () => {
    router.push(path);
    setInputValues({
      date: "",
      dateOperator: "equals",
      rate: "",
      rateOperator: "equals",
      status: "",
    });
  };

  return (
    <section className="flex flex-row justify-between w-full flex-wrap">
      <article>
        <form
          className="flex flex-row gap-4 justify-center my-4 flex-wrap "
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label htmlFor="rate" className="text-blue-800">
              Rate
            </label>
            <OperatorSelect
              value={inputValues.rateOperator ?? "equals"}
              field="rate"
              onChange={onInputChangeHandler}
            ></OperatorSelect>
            <input
              className="w-40 border border-blue-400 rounded-xl p-1 ml-1"
              name="rate"
              type="number"
              onChange={onInputChangeHandler}
              value={inputValues.rate ?? ""}
            ></input>
          </div>
          <div>
            <label htmlFor="date" className="text-blue-800">
              Date
            </label>
            <OperatorSelect
              value={inputValues.dateOperator ?? "equals"}
              field="date"
              onChange={onInputChangeHandler}
            ></OperatorSelect>
            <input
              name="date"
              className="w-40 border border-blue-400 rounded-xl p-1 ml-1"
              type="date"
              value={inputValues.date ?? ""}
              onChange={onInputChangeHandler}
            ></input>
          </div>
          <div>
            <label htmlFor="status" className="text-blue-800">
              Status
            </label>
            <select
              value={inputValues.status ?? ""}
              onChange={onInputChangeHandler}
              name="status"
              className="w-40 border border-blue-400 rounded-xl p-1 ml-1"
            >
              <option value="OPEN">OPEN</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="">ANY</option>
            </select>
          </div>
          <button
            onClick={onSearchHandler}
            aria-label="search"
            className="cursor-pointer  transition-colors hover:bg-blue-300 border border-blue-200 rounded-4xl p-2"
          >
            <MagnifyingGlassIcon height={16} width={16} />
          </button>
          <button
            onClick={onClearHandler}
            aria-label="clear"
            className="cursor-pointer  transition-colors hover:bg-red-300 border border-blue-200 rounded-4xl w-8"
          >
            x
          </button>
        </form>
      </article>
      <article>
        <menu className="flex flex-row gap-4 justify-center my-4 text-blue-800">
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
  const path = usePathname();

  let direction = "asc";
  if (searchParams.get("sortBy") === field) {
    direction = searchParams.get("sortDirection") === "asc" ? "desc" : "asc";
  }

  const newParams = new URLSearchParams(searchParams);

  newParams.set("sortDirection", direction);
  newParams.set("sortBy", field);

  const url = `${path}?${newParams.toString()}`;

  return (
    <li>
      <Link className="hover:underline cursor-pointer" href={url}>
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
      className="border border-blue-400 rounded-lg p-1 cursor-pointer  box-content ml-1"
    >
      <option value="gt">&gt;</option>
      <option value="lt">&lt;</option>
      <option value="equals">=</option>
    </select>
  );
}
