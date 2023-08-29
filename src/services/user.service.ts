import { fetchWrapper } from "@/helpers/fetch-wrapper";

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  access_token: string;
}

const baseURL =
  "https://9e6e-2804-3ef4-2c32-9e01-608d-32ce-f020-2c2e.ngrok-free.app";

class UserService {
  async login({ email, password }: ILoginRequest) {
    const response = await fetchWrapper.post<ILoginResponse, ILoginRequest>(
      `${baseURL}/auth/login`,
      { email: email, password: password }
    );
    return response;
  }
}

const userService = new UserService();
export { userService };
