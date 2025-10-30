import * as React from "react";

export const ListIcon: React.FC<React.SVGProps<SVGElement>> = ({
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
      d="M3 1H1v2h2zM3 5H1v2h2zM1 9h2v2H1zM3 13H1v2h2zM15 1H5v2h10zM15 5H5v2h10zM5 9h10v2H5zM15 13H5v2h10z"
    ></path>
  </svg>
);
