import * as React from "react";

export const MoneyIcon: React.FC<React.SVGProps<SVGElement>> = ({
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
      d="M3 21h18M3 18h18M5.823 3A2 2 0 1 1 3 5.823M5.823 3h12.354M5.823 3c-.874.003-1.354.026-1.731.218a2 2 0 0 0-.874.874c-.192.377-.215.857-.218 1.731m0 0v6.354m0 0A2 2 0 1 1 5.823 15M3 12.177c.003.875.026 1.354.218 1.731a2 2 0 0 0 .874.874c.377.192.857.215 1.731.218m0 0h12.354M21 12.177A2 2 0 1 0 18.177 15M21 12.177V5.823m0 6.354c-.003.875-.026 1.354-.218 1.731a2 2 0 0 1-.874.874c-.377.192-.857.215-1.731.218M21 5.823A2 2 0 1 1 18.177 3M21 5.823c-.003-.874-.026-1.354-.218-1.731a2 2 0 0 0-.874-.874c-.377-.192-.857-.215-1.731-.218M14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
    ></path>
  </svg>
);