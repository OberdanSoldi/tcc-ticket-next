import { Box, IconButton, Tooltip } from "@mui/material";
import type { EditTicketProps } from "./types";

import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { EditTicketModal } from "./EditTicketModal";
import { MessageToast } from "@/components/common/MessageToast";
const EditTicket: React.FC<EditTicketProps> = ({
  row,
  table,
  fetchTickets,
}) => {
  const [open, setOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState({
    haveError: false,
    message: "",
  });

  const toastHaveErrorMessage = toastMessage.message.length > 0;

  const toastSeverity = toastMessage.haveError ? "error" : "success";

  async function toastHandler(haveError: boolean, message: string) {
    setToastMessage({
      haveError,
      message,
    });
    setTimeout(() => {
      setToastMessage({
        haveError: true,
        message: "",
      });
    }, 2000);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip arrow placement="right" title="Editar ticket">
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      {open && (
        <EditTicketModal
          toastHandler={toastHandler}
          fetchTickets={fetchTickets}
          open={open}
          setOpen={setOpen}
          ticket={row.original}
        />
      )}
      {toastHaveErrorMessage && (
        <MessageToast
          open={toastHaveErrorMessage}
          handleClose={() => {}}
          severity={toastSeverity}
          messageText={toastMessage.message}
        />
      )}
    </Box>
  );
};

export { EditTicket };
