import type { Ticket } from "@/domain/Ticket";
import React from "react";
import { z } from "zod";
import { editFormSchema } from "./schema";

export interface EditTicketModalProps {
  ticket: Ticket;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  fetchTickets: () => void;
  toastHandler: (haveError: boolean, message: string) => void;
}

export type EditTicketFormValues = z.infer<typeof editFormSchema>;
