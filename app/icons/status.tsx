import * as React from "react";

export const StatusIcon: React.FC<React.SVGProps<SVGElement>> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ref,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    id="Icon"
    fill="#000"
    version="1.1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0m0 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10m-1.5-12h3v8h-3zm0-5h3v3h-3z"></path>
  </svg>
);
