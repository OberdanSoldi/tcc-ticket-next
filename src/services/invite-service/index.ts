import { fetchWrapper } from "@/helpers/fetch-wrapper";
import type { GetInviteRequest, GetInviteResponse } from "./types";
import { EXTERNAL_API_URL } from "@/config/clientEnvScheme";

class InviteService {
  private readonly _EXTERNAL_API_URL = EXTERNAL_API_URL!;

  async getInvite({ id, name, password }: GetInviteRequest) {
    try {
      await fetchWrapper.post<GetInviteResponse, Partial<GetInviteRequest>>(
        `${this._EXTERNAL_API_URL}/invite/${id}`,
        { name, password }
      );
    } catch (ex) {
      throw ex;
    }
  }
}

const inviteService = new InviteService();
export { inviteService };
