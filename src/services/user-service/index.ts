import { fetchWrapper } from "@/helpers/fetch-wrapper";
import type { ILoginRequest, ILoginResponse } from "./types";

class UserService {
  async login({ email, password }: ILoginRequest): Promise<void> {
    const response = await fetchWrapper.post<ILoginResponse, ILoginRequest>(
      `${process.env.INTERNAL_API_URL!}/api/auth/login`,
      { email: email, password: password }
    );
    localStorage.setItem("access_token", response.access_token);
  }
}

const userService = new UserService();
export { userService };
