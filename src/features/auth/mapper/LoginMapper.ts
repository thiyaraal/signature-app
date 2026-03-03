import type { LoginResponseDTO } from "../dto/LoginResponse.dto";

export interface AuthUser {
  id: string;
  fullName: string;
  username: string;
  role: string;
  token: string;
}

export const loginMapper = (dto: LoginResponseDTO): AuthUser => {
  return {
    id: dto.id,
    fullName: `${dto.firstName} ${dto.lastName}`,
    username: dto.username,
    role: dto.role,
    token: dto.token,
  };
};
