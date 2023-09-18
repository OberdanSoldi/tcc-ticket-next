import { INTERNAL_API_URL } from "@/config/clientEnvScheme";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import type {
  IAdminCreateTicketRequest,
  IAdminCreateTicketResponse,
} from "./types";

class TicketService {
  private readonly _INTERNAL_API_URL = INTERNAL_API_URL!;

  async adminCreateTicket(
    ticket: IAdminCreateTicketRequest
  ): Promise<IAdminCreateTicketResponse> {
    try {
      const response = await fetchWrapper.post<
        IAdminCreateTicketResponse,
        IAdminCreateTicketRequest
      >(`${this._INTERNAL_API_URL}/api/ticket/create-ticket`, { ...ticket });
    } catch (ex) {
      throw ex;
    }
  }
  async userCreateTicket() {}
}

const ticketService = new TicketService();
export { ticketService };
