import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
import type { ConfirmationModalProps } from "./types";

import style from "./style.module.scss";
import { userService } from "@/services/user-service";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  fetchUsers,
  open,
  setOpen,
  user,
  toastHandler,
}) => {
  async function submitHandler() {
    try {
      await userService.deleteUser(user.id);
      toastHandler(false, "Usuário removido com sucesso!");
    } catch {
      toastHandler(true, "Erro ao remover usuário!");
    } finally {
      fetchUsers();
      setOpen(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.wrapper}>
        <Grid container>
          <Grid className={style.header} item xs={12} md={12}>
            <span>
              Tem certeza que deseja excluir o usuário{" "}
              <strong>{user.name}</strong> ?
            </span>
          </Grid>
          <Grid className={style.item} item xs={6} md={6}>
            <Button
              onClick={() => setOpen(false)}
              className={style.cancelButton}
            >
              Cancelar
            </Button>
          </Grid>
          <Grid className={style.item} item xs={6} md={6}>
            <Button
              onClick={() => submitHandler()}
              className={style.confirmButton}
            >
              Confirmar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export { ConfirmationModal };
