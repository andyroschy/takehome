import Link from "next/link";

export function QueryControls() {
  return (
    <section className="flex flex-row justify-between w-full">
      <article>
        Filter:
        <form className="flex flex-row gap-4 justify-center my-4">
          <label htmlFor="">Rate</label>
          <label htmlFor="">Date</label>
          <label htmlFor="">Status</label>
        </form>
      </article>
      <article>
        Sort by:
        <menu className="flex flex-row gap-4 justify-center my-4">
          <li>
            <Link href={"/shifts?sortBy=hourlyRateCents&sortDirection=asc"}>
              Rate
            </Link>
          </li>
          <li>
            <Link href={"/shifts?sortBy=startsAt&sortDirection=asc"}>Date</Link>
          </li>
          <li>
            <Link href={"/shifts?sortBy=status&sortDirection=asc"}>Status</Link>
          </li>
        </menu>
      </article>
    </section>
  );
}
