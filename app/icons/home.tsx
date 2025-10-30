import * as React from "react";

export const HomeIcon: React.FC<React.SVGProps<SVGElement>> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M8 0 0 6v2h1v7h3v-5h3v5h8V8h1V6l-2-1.5V1h-3v1.25zm1 10h3v3H9z"
      clipRule="evenodd"
    ></path>
  </svg>
);
