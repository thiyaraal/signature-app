import type { ReactNode } from "react";
import "./ButtonWidget.css";

interface ButtonProps {
  width?: string;
  colorButton?: string;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export function ButtonWidget({
  label,
  width,
  colorButton,
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
      style={{ backgroundColor: colorButton, width: width }}
      className={`button button-${variant}`}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
}
