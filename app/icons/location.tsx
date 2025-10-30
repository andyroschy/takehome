import * as React from "react";

export const LocationIcon: React.FC<React.SVGProps<SVGElement>> = ({
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
      d="M12 21c3.5-3.6 7-6.824 7-10.8S15.866 3 12 3s-7 3.224-7 7.2 3.5 7.2 7 10.8"
    ></path>
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
    ></path>
  </svg>
);
