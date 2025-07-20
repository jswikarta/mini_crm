import type { ChangeEvent } from "react";

interface MyInputProps {
  id: string;
  type?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  readOnly?: boolean;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

export default function Input({
  id,
  type = "text",
  value,
  onChange,
  readOnly = false,
  className,
  error,
  placeholder,
  disabled = false,
}: MyInputProps) {
  const baseClasses: string = `
    text-xs
    rounded-xs
    border
    px-3
    py-1.5
    text-gray-700
    placeholder-gray-400
    focus:outline-none
    transition-colors
    duration-150
    ease-in-out
    w-full
  `
    .replace(/\s+/g, " ")
    .trim();

  const stateClasses: string = error
    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
    : readOnly
      ? "bg-gray-100 border-gray-300 cursor-not-allowed"
      : "border-gray-300 focus:border-blue-300 focus:ring-blue-200";

  const disabledClasses: string = disabled
    ? "bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300"
    : "";

  return (
    <>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        disabled={disabled}
        className={`${baseClasses} ${stateClasses} ${disabledClasses} ${className || ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        autoComplete="off"
      />
      {error && (
        <div id={`${id}-error`} className="mt-1 text-xs text-red-600">
          {error}
        </div>
      )}
    </>
  );
}
