import { fetchWrapper } from "@/helpers/fetch-wrapper";
import type { ILoginRequest, ILoginResponse } from "./types";
import { Ticket } from "@/domain/Ticket";
import { INTERNAL_API_URL } from "@/config/clientEnvScheme";

class UserService {
  async login({ email, password }: ILoginRequest): Promise<void> {
    const response = await fetchWrapper.post<ILoginResponse, ILoginRequest>(
      `${INTERNAL_API_URL!}/api/auth/login`,
      { email: email, password: password }
    );
    localStorage.setItem("access_token", response.access_token);
  }

  async getUserTickets(): Promise<Ticket[]> {
    const response = await fetchWrapper.get<Ticket[]>(
      `${INTERNAL_API_URL}/api/user/get-user-tickets`
    );
    return response;
  }
}

const userService = new UserService();
export { userService };
