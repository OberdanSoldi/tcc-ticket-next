import React from "react";
import { DeleteUserProps } from "./types";
import { Box, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmationModal } from "./ConfirmationModal";
import { MessageToast } from "@/components/common/MessageToast";

const DeleteUser: React.FC<DeleteUserProps> = ({ fetchUsers, row, table }) => {
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
      <Tooltip arrow placement="left" title="Remover usuário">
        <IconButton onClick={() => setOpen(true)}>
          <DeleteIcon sx={{ color: "red" }} />
        </IconButton>
      </Tooltip>
      {open && (
        <ConfirmationModal
          fetchUsers={fetchUsers}
          open={open}
          setOpen={setOpen}
          user={row.original}
          toastHandler={toastHandler}
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

export { DeleteUser };
