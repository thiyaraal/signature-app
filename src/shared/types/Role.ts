export type UserRole = "ADMINISTRATOR" | "DIVISION_ADMINISTRATOR" | "USER";

export interface UserSession {
  name: string;
  avatarName: string;
  role: UserRole;
  email: string;
  companyName?: string;
}
