import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import type { FullTicketModalInfoProps } from "./types";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, TextField } from "@mui/material";
import { userService } from "@/services/user-service";
import type { IUser } from "@/domain/user/type";

import style from "./style.module.scss";

const FullTicketModalInfo: React.FC<FullTicketModalInfoProps> = ({
  open,
  setOpen,
  ticket,
}) => {
  const handleClose = () => setOpen(false);
  const [users, setUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    (async () => {
      const response = await userService.getUsers();
      setUsers(response);
    })();
  }, []);

  const createdBy = users.find((user) => user.id === ticket.created_by);
  const assignedTo = users.find((user) => user.id === ticket.assigned_to);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.wrapper}>
        <Grid container className={style.container} spacing={2}>
          <Grid item className={style.closeButton} xs={12} md={12}>
            <IconButton onClick={handleClose}>
              <CloseIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Grid>
          <Grid className={style.ticketInfoFields} item xs={12} md={12}>
            <TextField
              className={style.inputField}
              value={ticket.title}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Título"
            />
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={6} md={6}>
            <TextField
              className={style.inputField}
              value={ticket.description}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Descrição"
              multiline
              rows={8}
            />
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={6} md={6}>
            <TextField
              className={style.inputField}
              value={ticket.problemType}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Tipo do problema"
            />
            <TextField
              sx={{ marginTop: "15px" }}
              className={style.inputField}
              value={ticket.priority}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Prioridade"
            />
            <TextField
              sx={{ marginTop: "15px" }}
              className={style.inputField}
              value={ticket.computer_id}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="ID do computador"
            />
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={6} md={6}>
            <TextField
              className={style.inputField}
              value={assignedTo?.name}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Atribuído para"
            />
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={6} md={6}>
            <TextField
              className={style.inputField}
              value={createdBy?.name}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Criado por"
            />
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={6} md={6}>
            <TextField
              className={style.inputField}
              value={ticket.date}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Data de criação"
            />
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={6} md={6}>
            <TextField
              className={style.inputField}
              value={ticket.status}
              InputProps={{ readOnly: true }}
              variant="outlined"
              label="Status"
            />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export { FullTicketModalInfo };
