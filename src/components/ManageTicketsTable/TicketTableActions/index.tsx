import { SeeFullTicket } from "@/components/HistoryTable/SeeFullTicket";
import type { TicketTableActionsProps } from "./types";
import { EditTicket } from "./EditTicket";
import { Box } from "@mui/material";
import { DeleteTicket } from "./DeleteTicket";
import React from "react";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";

const TicketTableActions: React.FC<TicketTableActionsProps> = ({
  row,
  table,
  fetchTickets,
}) => {
  const [userRole, setUserRole] = React.useState<UserRole>();

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  const isUserAdmin = userRole === UserRole.ADMIN;

  const shouldRenderDeleteButton = isUserAdmin;

  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <SeeFullTicket row={row} table={table} />
      <EditTicket fetchTickets={fetchTickets} row={row} table={table} />
      {shouldRenderDeleteButton && (
        <DeleteTicket fetchTickets={fetchTickets} row={row} table={table} />
      )}
    </Box>
  );
};

export { TicketTableActions };
