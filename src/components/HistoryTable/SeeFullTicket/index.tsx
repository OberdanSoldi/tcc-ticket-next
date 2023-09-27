import { Box, IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { SeeFullTicketProps } from "./types";
import React from "react";
import { FullTicketModalInfo } from "./FullTicketModalInfo";

const SeeFullTicket: React.FC<SeeFullTicketProps> = ({ row, table }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip arrow placement="left" title="Ver ticket completo">
        <IconButton onClick={() => setOpen(true)}>
          <VisibilityIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      {open && (
        <FullTicketModalInfo
          open={open}
          setOpen={setOpen}
          ticket={row.original}
        />
      )}
    </Box>
  );
};

export { SeeFullTicket };
