import { fetchWrapper } from "@/helpers/fetch-wrapper";
import type { ILoginRequest, ILoginResponse } from "./types";
import { Ticket } from "@/domain/Ticket";
import { INTERNAL_API_URL } from "@/config/clientEnvScheme";
import { parseJwt } from "@/helpers/jwt-parse";
import type { UserRole } from "@/domain/enums/UserRole";

class UserService {
  async login({ email, password }: ILoginRequest): Promise<void> {
    try {
      const response = await fetchWrapper.post<ILoginResponse, ILoginRequest>(
        `${INTERNAL_API_URL!}/api/auth/login`,
        { email: email, password: password }
      );
      localStorage.setItem("access_token", response.access_token);
    } catch (ex) {
      console.error("Error while logging in", ex);
      throw ex;
    }
  }

  async getUserTickets(): Promise<Ticket[]> {
    const response = await fetchWrapper.get<Ticket[]>(
      `${INTERNAL_API_URL}/api/user/get-user-tickets`
    );
    return response;
  }

  getUserRole(): UserRole {
    const token = localStorage.getItem("access_token");
    const role = parseJwt(token!).role;
    return role as UserRole;
  }
}

const userService = new UserService();
export { userService };
