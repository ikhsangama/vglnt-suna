'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewChatButtonProps {
  variant?: 'default' | 'sidebar' | 'compact';
  className?: string;
}

export function NewChatButton({
                                variant = 'default',
                                className
                              }: NewChatButtonProps) {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 rounded-lg";

  const variants = {
    default: "px-4 py-2 text-sm text-white bg-transparent border border-white hover:bg-white" +
      " hover:text-blue-800" +
      " rounded-lg" +
      " w-full",

    // For sidebar integration
    sidebar: "px-3 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full",

    // Compact version
    compact: "px-3 py-2 text-xs text-white bg-blue-600 hover:bg-blue-700 rounded-md"
  };

  return (
    <Link
      href="/dashboard"
      className={cn(baseClasses, variants[variant], className)}
    >
      <Plus className="h-4 w-4 shrink-0" />
      <span>New Chat</span>
    </Link>
  );
}