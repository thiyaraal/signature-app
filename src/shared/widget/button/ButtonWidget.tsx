import type { ReactNode } from "react";
import "./ButtonWidget.css";

interface ButtonProps {
  color?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
}

export function ButtonWidget({
  label,
  onClick,
  disabled = false,
  type = "submit",
  color,
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="button"
      style={{ backgroundColor: color }}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
