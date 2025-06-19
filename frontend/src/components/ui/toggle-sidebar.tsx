import React from 'react';
import { cn } from '@/lib/utils';

interface ToggleSidebarProps {
  className?: string;
}

export function ToggleSidebar({ className }: ToggleSidebarProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-4', className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.75C0 0.783502 0.783502 0 1.75 0H18.25C19.2165 0 20 0.783501 20 1.75V18.25C20 19.2165 19.2165 20 18.25 20H1.75C0.783502 20 0 19.2165 0 18.25V1.75ZM1.75 1.5C1.61193 1.5 1.5 1.61193 1.5 1.75V6H18.5V1.75C18.5 1.61193 18.3881 1.5 18.25 1.5H1.75ZM18.5 7.5H7.5V18.5H18.25C18.3881 18.5 18.5 18.3881 18.5 18.25V7.5ZM6 18.5V7.5H1.5V18.25C1.5 18.3881 1.61193 18.5 1.75 18.5H6Z"
        fill="currentColor"
      />
    </svg>
  );
}