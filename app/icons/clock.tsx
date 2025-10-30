import * as React from "react";

export const ClockIcon: React.FC<React.SVGProps<SVGElement>> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 7v5l2.5 1.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    ></path>
  </svg>
);
