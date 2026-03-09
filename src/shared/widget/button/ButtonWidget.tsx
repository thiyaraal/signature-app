import type { ReactNode } from "react";
import "./ButtonWidget.css";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export function ButtonWidget({
  label,
  onClick,
  disabled = false,
  type = "submit",
  variant = "primary",
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant}`}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
