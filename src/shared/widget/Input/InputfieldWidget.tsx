import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./InputField.css";

interface InputFieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  showPasswordToggle?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function InputField({
  label,
  id,
  type,
  placeholder,
  showPasswordToggle = false,
  value,
  onChange,
}: InputFieldProps) {
  const [isVisible, setIsVisible] = useState(false);

  const inputType = showPasswordToggle && isVisible ? "text" : type;

  return (
    <div className="input-field">
      <label htmlFor={id} className="input-field__label">
        {label}
      </label>

      <div className="input-field__wrapper">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          className="input-field__input"
          value={value}
          onChange={onChange}
        />

        {showPasswordToggle && (
          <span
            className="input-field__icon"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
}
