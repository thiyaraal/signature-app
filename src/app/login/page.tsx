"use client";

import { LoginFormComponent } from "@/src/features/auth/component/LoginFormComponent";
import { useLoginHook } from "@/src/features/auth/hooks/LoginHook";
import { useRouter } from "next/navigation";
import { FaFolder } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const { username, password, loading, setUsername, setPassword, submit } =
    useLoginHook();

  return (
    <div className="login">
      <div className="login__card">
        <div className="icon-card">
          <FaFolder className="icon-card__icon" />
        </div>
        <h2 className="login__title">Welcome Back</h2>
        <p className="login__subtitle"> Login to your account</p>

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
