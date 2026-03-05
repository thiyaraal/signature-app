import { InputField } from "../../../shared/widget/Input/InputfieldWidget";
import { ButtonWidget } from "../../../shared/widget/button/ButtonWidget";
import styles from "./login-form-component.module.css";

interface LoginFormComponent {
  username: string;
  password: string;
  loading?: boolean;
  setUsername: (v: string) => void;
  setPassword: (v: string) => void;
  onSubmit: () => void;
}

export function LoginFormComponent({
  username,
  password,
  loading,
  setUsername,
  setPassword,
  onSubmit,
}: LoginFormComponent) {
  return (
    <form
      className={styles.loginForm}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputField
        label="Username"
        id="username"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <InputField
        label="Password"
        id="password"
        type="password"
        placeholder="Enter password"
        showPasswordToggle
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <ButtonWidget
        label={loading ? "Logging in..." : "Login"}
        disabled={loading}
      />
    </form>
  );
}
