"use client";

import { fetchWrapper } from "@/helpers/fetch-wrapper";
import type { ILoginRequest, ILoginResponse } from "./types";
import { Ticket } from "@/domain/Ticket";
import { EXTERNAL_API_URL } from "@/config/clientEnvScheme";
import { parseJwt } from "@/helpers/jwt-parse";
import type { UserRole } from "@/domain/enums/UserRole";
import type { IUser, IUserResponse } from "@/domain/user/type";

class UserService {
  private readonly _EXTERNAL_API_URL = EXTERNAL_API_URL!;

  async login({ email, password }: ILoginRequest): Promise<void> {
    try {
      const response = await fetchWrapper.post<ILoginResponse, ILoginRequest>(
        `${this._EXTERNAL_API_URL}/auth/login`,
        { email: email, password: password }
      );
      localStorage.setItem("access_token", `Bearer ${response.access_token}`);
    } catch (ex) {
      throw ex;
    }
  }

  async getUserTickets(): Promise<Ticket[]> {
    const response = await fetchWrapper.get<Ticket[]>(
      `${this._EXTERNAL_API_URL}/user/tickets`
    );
    return response;
  }

  async getUserRole(): Promise<UserRole> {
    const token = localStorage.getItem("access_token");
    const role = parseJwt(token!).role;
    return role as UserRole;
  }

  async getUsers(): Promise<IUser[]> {
    try {
      const data = await fetchWrapper.get<IUserResponse>(
        `${this._EXTERNAL_API_URL}/user`
      );
      return data;
    } catch (ex) {
      throw ex;
    }
  }

  async getUserById(id: string): Promise<IUser> {
    try {
      const data = await fetchWrapper.get<IUser>(
        `${this._EXTERNAL_API_URL}/user/${id}`
      );
      return data;
    } catch (ex) {
      throw ex;
    }
  }
}

const userService = new UserService();
export { userService };
