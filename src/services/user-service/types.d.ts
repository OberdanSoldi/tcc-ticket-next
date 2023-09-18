import { UserRole } from "@/domain/enums/UserRole";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
}
