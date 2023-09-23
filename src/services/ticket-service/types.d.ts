import {
  CreateTicketAdminForm,
  CreateTicketUserForm,
} from "@/components/CreateTicketForm/types";
import { Ticket } from "@/domain/Ticket";

export type IAdminCreateTicketRequest = CreateTicketAdminForm;
export type IAdminCreateTicketResponse = void;

export type IUserCreateTicketRequest = CreateTicketUserForm;
export type IUserCreateTicketResponse = void;

export interface ITicketResponse {
  response: Ticket[];
}
