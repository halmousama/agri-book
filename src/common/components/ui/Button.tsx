import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from "../../utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline';
}

export const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all active:scale-95",
        variant === 'primary' && "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md",
        variant === 'outline' && "border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
