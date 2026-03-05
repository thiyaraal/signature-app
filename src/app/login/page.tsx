"use client";

import { LoginFormComponent } from "@/src/features/auth/component/LoginFormComponent";
import { useLoginHook } from "@/src/features/auth/hooks/LoginHook";
import { useRouter } from "next/navigation";
import { FaFolder } from "react-icons/fa";
import styles from "@/src/features/auth/component/login-form-component.module.css";

export default function LoginPage() {
  const router = useRouter();

  const { username, password, loading, setUsername, setPassword, submit } =
    useLoginHook();

  return (
    <div className={styles.login}>
      <div className={styles.loginCard}>
        <div className={styles.iconCard}>
          <FaFolder className={styles.iconCardIcon} />
        </div>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        <p className={styles.loginSubtitle}> Login to your account</p>

        <LoginFormComponent
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          loading={loading}
          onSubmit={submit}
        />
      </div>
    </div>
  );
}
