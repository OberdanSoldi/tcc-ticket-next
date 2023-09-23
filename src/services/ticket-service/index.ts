import { INTERNAL_API_URL } from "@/config/clientEnvScheme";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import {
  ITicketResponse,
  type IAdminCreateTicketRequest,
  type IAdminCreateTicketResponse,
  type IUserCreateTicketRequest,
  type IUserCreateTicketResponse,
} from "./types";
import { Ticket } from "@/domain/Ticket";
import { ticketConverter } from "@/helpers/ticket-converter";

class TicketService {
  private readonly _INTERNAL_API_URL = INTERNAL_API_URL!;

  async adminCreateTicket(
    ticket: IAdminCreateTicketRequest
  ): Promise<IAdminCreateTicketResponse> {
    try {
      await fetchWrapper.post<
        IAdminCreateTicketResponse,
        IAdminCreateTicketRequest
      >(`${this._INTERNAL_API_URL}/api/ticket/create-ticket`, { ...ticket });
    } catch (ex) {
      throw ex;
    }
  }
  async userCreateTicket(
    ticket: IUserCreateTicketRequest
  ): Promise<IUserCreateTicketResponse> {
    try {
      await fetchWrapper.post<
        IUserCreateTicketResponse,
        IUserCreateTicketRequest
      >(`${this._INTERNAL_API_URL}/api/ticket/create-ticket`, { ...ticket });
    } catch (ex) {
      throw ex;
    }
  }

  async getAllTickets(): Promise<Ticket[]> {
    try {
      const data = await fetchWrapper.get<ITicketResponse>(
        `${this._INTERNAL_API_URL}/api/ticket/get-all`
      );

      const convertedValues = ticketConverter.convertToPortuguese(
        data.response
      );

      return convertedValues;
    } catch (ex) {
      throw ex;
    }
  }
}

const ticketService = new TicketService();
export { ticketService };
