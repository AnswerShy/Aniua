import React from 'react';

const ArrowDownIcon: React.FC<IconProps> = ({ size = 25, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? size}
    height={props.height ?? size}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

export default React.memo(ArrowDownIcon);
