import React from 'react';

const SearchIcon: React.FC<IconProps> = ({ size = 25, ...props }) => (
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
    <path d="m21 21-4.34-4.34"></path>
    <circle cx="11" cy="11" r="8"></circle>
  </svg>
);

export default React.memo(SearchIcon);
