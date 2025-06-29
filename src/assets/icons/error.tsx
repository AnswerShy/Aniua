import React from 'react';

const ErrorIcon: React.FC<IconProps> = ({ size = 25, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? size}
    height={props.height ?? size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="m15 9-6 6M9 9l6 6"></path>
  </svg>
);

export default React.memo(ErrorIcon);
