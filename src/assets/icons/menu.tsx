import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

const MenuIcon: React.FC<IconProps> = ({ size = 25, ...props }) => (
  <svg
    width={props.width ?? size}
    height={props.height ?? size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="lucide lucide-align-justify-icon lucide-align-justify"
    {...props}
  >
    <path d="M3 12h18M3 18h18M3 6h18" />
  </svg>
);

export default MenuIcon;
