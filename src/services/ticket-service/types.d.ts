import {
  CreateTicketAdminForm,
  CreateTicketUserForm,
} from "@/components/CreateTicketForm/types";
import { Ticket } from "@/domain/Ticket";

export type IAdminCreateTicketRequest = CreateTicketAdminForm;
export type IAdminCreateTicketResponse = void;

export type IUserCreateTicketRequest = CreateTicketUserForm;
export type IUserCreateTicketResponse = void;

export type ITicketResponse = Ticket[];

export type IUpdateTicketStatusResponse = void;
export type IUpdateTicketStatusRequest = {
  status: string;
};

export type IUpdateTicketPriorityResponse = void;
export type IUpdateTicketPriorityRequest = {
  priority: string;
};

export type IUpdateTicketAssigneeResponse = void;
export type IUpdateTicketAssigneeRequest = {
  assignee_id: string;
};
