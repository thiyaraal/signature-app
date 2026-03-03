import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../service/LoginService";

export function useLoginHook() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submit = async () => {
    if (!username || !password) {
      alert("Username and password required");
      return;
    }

    setLoading(true);
    try {
      const user = await authService.login(username, password);

      console.log("Login success:", user);

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login detail error:", error);

      let message = "Login failed";
      if (error.response) {
        message =
          error.response.data?.msg ||
          `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        message = "Tidak ada respon dari server. Cek koneksi atau IP API.";
      } else {
        message = error.message;
      }

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    password,
    loading,
    setUsername,
    setPassword,
    submit,
  };
}
