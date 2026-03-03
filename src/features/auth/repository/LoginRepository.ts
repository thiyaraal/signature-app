import { BaseResponse } from "@/src/shared/response/BaseResponse";
import { apiClient } from "../../../shared/http/ApiClient";
import type { LoginRequest } from "../dto/LoginRequest.dto";
import type { LoginResponseDTO } from "../dto/LoginResponse.dto";

export const authRepository = {
  async login(payload: LoginRequest) {
    const response = await apiClient.post<BaseResponse<LoginResponseDTO>>(
      "auth/login",
      payload,
    );

    return response.data;
  },
};
