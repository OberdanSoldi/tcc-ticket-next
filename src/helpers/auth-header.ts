import type { AxiosRequestHeaders } from "axios";

export class AuthHeader {
  createHeaders(): AxiosRequestHeaders {
    const token = localStorage.getItem("access_token");
    if (token) {
      return { Authorization: token } as AxiosRequestHeaders;
    } else {
      return {} as AxiosRequestHeaders;
    }
  }
}

const authHeader = new AuthHeader();
export { authHeader };
