import React from "react";

interface RightIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const RightIcon: React.FC<RightIconProps> = ({
  size = 24,
  color = "currentColor",
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
};

export default RightIcon;
