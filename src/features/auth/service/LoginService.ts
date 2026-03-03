import { loginMapper } from "../mapper/LoginMapper";
import { authRepository } from "../repository/LoginRepository";

export const authService = {
  async login(username: string, password: string) {
    const response = await authRepository.login({
      username,
      password,
    });

    if (!response || response.success === false) {
      throw new Error(response?.msg ?? "Login failed");
    }

    if (!response.result) {
      throw new Error("User data not found");
    }

    const user = loginMapper(response.result);

    if (typeof window !== "undefined" && user.token) {
      localStorage.setItem("token", user.token);
    }

    return user;
  },
};
