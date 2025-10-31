export type OrdinalFilter<T extends number | Date> = {
  operator: "gt" | "lt" | "equals";
  value: T;
};

export function extractNumericFilter(
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

export function extractDateFilter(
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