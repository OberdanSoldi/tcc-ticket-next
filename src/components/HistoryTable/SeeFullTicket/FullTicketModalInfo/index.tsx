import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import type { FullTicketModalInfoProps } from "./types";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Tooltip } from "@mui/material";

import style from "./style.module.scss";

const FullTicketModalInfo: React.FC<FullTicketModalInfoProps> = ({
  open,
  setOpen,
  ticket,
}) => {
  const handleClose = () => setOpen(false);

  console.log(ticket);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.wrapper}>
        <Grid container className={style.container}>
          <Grid item className={style.closeButton} xs={12} md={12}>
            <IconButton onClick={handleClose}>
              <CloseIcon
                sx={{
                  color: "white",
                }}
              />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={12}>
            <h2>{ticket.title}</h2>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Descrição: {ticket.description}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Tipo: {ticket.problemType}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Prioridade: {ticket.priority}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Máquina: {ticket.computer_id}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Responsável: {ticket.assigned_to}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Criado por: {ticket.created_by}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Data: {ticket.date}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Status: {ticket.status}</p>
          </Grid>
          <Grid item className={style.ticketInfoFields} xs={12} md={12}>
            <p>Id: {ticket.id}</p>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export { FullTicketModalInfo };
