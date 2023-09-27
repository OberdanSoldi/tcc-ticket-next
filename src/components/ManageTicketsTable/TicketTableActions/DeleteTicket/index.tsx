import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { DeleteTicketProps } from "./types";
import { ConfirmationModal } from "./ConfirmationModal";
import { MessageToast } from "@/components/common/MessageToast";

const DeleteTicket: React.FC<DeleteTicketProps> = ({
  fetchTickets,
  row,
  table,
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
    <Box>
      <Tooltip arrow placement="right" title="Remover ticket">
        <IconButton>
          <DeleteIcon sx={{ color: "red" }} onClick={() => setOpen(true)} />
        </IconButton>
      </Tooltip>
      {open && (
        <ConfirmationModal
          fetchTickets={fetchTickets}
          toastHandler={toastHandler}
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

export { DeleteTicket };
