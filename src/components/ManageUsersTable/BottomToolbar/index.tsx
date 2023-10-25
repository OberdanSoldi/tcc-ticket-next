import { User } from "@/domain/User";
import { Box, Button, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { MRT_TableInstance } from "material-react-table";
import React from "react";

import style from "./style.module.scss";
import { InviteModal } from "./InviteModal";
import { MessageToast } from "@/components/common/MessageToast";

interface BottomToolbarProps {
  table: MRT_TableInstance<User>;
}

const BottomToolbar: React.FC<BottomToolbarProps> = ({ table }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

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
    <div className={style.wrapper}>
      <Grid container className={style.container}>
        <Grid item>
          <Box>
            <div></div>
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Button onClick={handleOpen} className={style.inviteUserButton}>
              Convidar Usuário
            </Button>
          </Box>
        </Grid>
      </Grid>
      {open && (
        <InviteModal
          open={open}
          setOpen={setOpen}
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
    </div>
  );
};

export { BottomToolbar };
