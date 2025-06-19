import React from 'react';

interface IconProps {
  className?: string;
}

export const ChevronUp: React.FC<IconProps> = ({ className = "h-4 w-4" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4697 7.21967C11.7626 6.92678 12.2374 6.92678 12.5303 7.21967L20.0303 14.7197C20.3232 15.0126 20.3232 15.4874 20.0303 15.7803C19.7374 16.0732 19.2626 16.0732 18.9697 15.7803L12 8.81066L5.03033 15.7803C4.73744 16.0732 4.26256 16.0732 3.96967 15.7803C3.67678 15.4874 3.67678 15.0126 3.96967 14.7197L11.4697 7.21967Z"
        fill="currentColor"
      />
    </svg>
  );
};