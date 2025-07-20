import type { MouseEvent, ReactNode } from "react";

interface MyButtonProps {
  disabled?: boolean;
  children: ReactNode;
  className?: string;
  type?: "submit" | "reset" | "button";
  color: "green" | "yellow" | "red";
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({
  disabled,
  children,
  className,
  color,
  type = "button",
  onClick,
}: MyButtonProps) {
  const colorClasses: Record<MyButtonProps["color"], string> = {
    green: "bg-green-500 text-gray-100 hover:bg-green-600",
    yellow: "bg-yellow-500 text-gray-100 hover:bg-yellow-600",
    red: "bg-red-500 text-gray-100 hover:bg-red-600",
  };

  const disabledClasses: string = disabled ? " cursor-not-allowed " : "";

  const selectedColorClasses: string = colorClasses[color] || "";
  const baseClasses: string = `
    flex
    items-center
    justify-center
    px-2
    py-1
    text-xs
    font-medium
    min-w-auto
    transition-colors 
    duration-200
    ease-in-out
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseClasses} ${selectedColorClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
