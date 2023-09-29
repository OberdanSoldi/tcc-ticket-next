import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
import { ConfirmationModalProps } from "./types";
import CloseIcon from "@mui/icons-material/Close";
import { ticketService } from "@/services/ticket-service";

import style from "./style.module.scss";

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  fetchTickets,
  open,
  setOpen,
  ticket,
  toastHandler,
}) => {
  async function submitHandler() {
    try {
      await ticketService.deleteTicket(ticket.id);
      toastHandler(false, "Ticket removido com sucesso!");
      setOpen(false);
      fetchTickets();
    } catch {
      toastHandler(true, "Erro ao remover ticket!");
    } finally {
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
            <span>Tem certeza que deseja remover o ticket?</span>
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
