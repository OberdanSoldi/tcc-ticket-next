"use client";
import { EXTERNAL_API_URL } from "@/config/clientEnvScheme";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
import {
  type ITicketResponse,
  type IAdminCreateTicketRequest,
  type IAdminCreateTicketResponse,
  type IUserCreateTicketRequest,
  type IUserCreateTicketResponse,
  type IUpdateTicketStatusRequest,
  type IUpdateTicketStatusResponse,
  type IUpdateTicketPriorityResponse,
  type IUpdateTicketPriorityRequest,
  IUpdateTicketAssigneeResponse,
  IUpdateTicketAssigneeRequest,
} from "./types";
import { Ticket } from "@/domain/Ticket";
import { ticketConverter } from "@/helpers/ticket-converter";

class TicketService {
  private readonly _EXTERNAL_API_URL = EXTERNAL_API_URL!;

  async adminCreateTicket(
    ticket: IAdminCreateTicketRequest
  ): Promise<IAdminCreateTicketResponse> {
    try {
      await fetchWrapper.post<
        IAdminCreateTicketResponse,
        IAdminCreateTicketRequest
      >(`${this._EXTERNAL_API_URL}/ticket`, { ...ticket });
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
      >(`${this._EXTERNAL_API_URL}/ticket`, { ...ticket });
    } catch (ex) {
      throw ex;
    }
  }

  async getAllTickets(): Promise<Ticket[]> {
    try {
      const data = await fetchWrapper.get<ITicketResponse>(
        `${this._EXTERNAL_API_URL}/ticket`
      );

      console.log(data);

      const convertedValues = ticketConverter.convertToPortuguese(data);

      console.log(convertedValues);

      return convertedValues;
    } catch (ex) {
      throw ex;
    }
  }

  async updateTicketStatus(id: string, status: string): Promise<void> {
    try {
      if (status === "") {
        return;
      }
      const data = await fetchWrapper.patch<
        IUpdateTicketStatusResponse,
        IUpdateTicketStatusRequest
      >(`${this._EXTERNAL_API_URL}/ticket/status/${id}`, {
        status,
      });

      return data;
    } catch (ex) {
      throw ex;
    }
  }

  async updateTicketPriority(id: string, priority: string): Promise<void> {
    try {
      if (priority === "") {
        return;
      }
      const data = await fetchWrapper.patch<
        IUpdateTicketPriorityResponse,
        IUpdateTicketPriorityRequest
      >(`${this._EXTERNAL_API_URL}/ticket/priority/${id}`, { priority });

      return data;
    } catch (ex) {
      throw ex;
    }
  }

  async updateTicketAssignee(id: string, assignee: string): Promise<void> {
    try {
      if (assignee === "") {
        return;
      }
      const data = await fetchWrapper.patch<
        IUpdateTicketAssigneeResponse,
        IUpdateTicketAssigneeRequest
      >(`${this._EXTERNAL_API_URL}/ticket/assignee/${id}`, {
        assignee_id: assignee,
      });

      return data;
    } catch (ex) {
      throw ex;
    }
  }

  async deleteTicket(id: string): Promise<void> {
    try {
      await fetchWrapper.delete(`${this._EXTERNAL_API_URL}/ticket/${id}`);
    } catch (ex) {
      throw ex;
    }
  }
}

const ticketService = new TicketService();
export { ticketService };
