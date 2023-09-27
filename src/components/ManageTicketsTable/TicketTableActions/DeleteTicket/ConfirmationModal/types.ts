import type { Ticket } from "@/domain/Ticket";
import React from "react";

export interface ConfirmationModalProps {
  ticket: Ticket;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  fetchTickets: () => void;
  toastHandler: (haveError: boolean, message: string) => void;
}
