import { SeeFullTicket } from "@/components/HistoryTable/SeeFullTicket";
import type { TicketTableActionsProps } from "./types";
import { EditTicket } from "./EditTicket";
import { Box } from "@mui/material";
import { DeleteTicket } from "./DeleteTicket";

const TicketTableActions: React.FC<TicketTableActionsProps> = ({
  row,
  table,
  fetchTickets,
}) => {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <SeeFullTicket row={row} table={table} />
      <EditTicket fetchTickets={fetchTickets} row={row} table={table} />
      <DeleteTicket fetchTickets={fetchTickets} row={row} table={table} />
    </Box>
  );
};

export { TicketTableActions };
