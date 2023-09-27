import type { Ticket } from "@/domain/Ticket";
import type { MRT_Row, MRT_TableInstance } from "material-react-table";

export interface EditTicketProps {
  row: MRT_Row<Ticket>;
  table: MRT_TableInstance<Ticket>;
  fetchTickets: () => void;
}
