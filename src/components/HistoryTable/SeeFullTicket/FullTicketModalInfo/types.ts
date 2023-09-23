import type { Ticket } from "@/domain/Ticket";

export interface FullTicketModalInfoProps {
  ticket: Ticket;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}
