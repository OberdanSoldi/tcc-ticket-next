import { Ticket } from "@/domain/Ticket";
import React from "react";
import {
  EditTicketFormValues,
  EditTicketFormValuesTech,
  EditTicketModalProps,
} from "./types";
import {
  Box,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { SelectField } from "@/components/common/SelectField";
import { priority, status } from "./constants";
import { InputSelectItems } from "@/domain/InputSelectItems";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema } from "./schema";
import { ticketService } from "@/services/ticket-service";
import CloseIcon from "@mui/icons-material/Close";

import style from "./style.module.scss";

const EditTicketModal: React.FC<EditTicketModalProps> = ({
  open,
  setOpen,
  ticket,
  fetchTickets,
  toastHandler,
}) => {
  const [users, setUsers] = React.useState<InputSelectItems[]>([]);
  const [userRole, setUserRole] = React.useState<UserRole>();

  const { register, handleSubmit } = useForm();

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  const isUserAdmin = userRole === UserRole.ADMIN;

  React.useEffect(() => {
    if (isUserAdmin) {
      (async () => {
        const data = await userService.getUsers();
        const users = data.map((it) => {
          return {
            name: it.name,
            value: it.id,
          };
        });
        setUsers(users);
      })();
    }
  }, [isUserAdmin]);

  async function submitHandler(data: unknown) {
    isUserAdmin
      ? adminSubmitHandler(data as EditTicketFormValues)
      : techSubmitHandler(data as EditTicketFormValuesTech);
  }

  async function adminSubmitHandler(data: EditTicketFormValues) {
    try {
      await ticketService.updateTicketAssignee(ticket.id, data.assignee);
      await ticketService.updateTicketPriority(ticket.id, data.priority);
      await ticketService.updateTicketStatus(ticket.id, data.status);
      toastHandler(false, "Ticket atualizado com sucesso!");
      fetchTickets();
      setOpen(false);
    } catch {
      toastHandler(true, "Erro ao atualizar ticket!");
    }
  }

  async function techSubmitHandler(data: EditTicketFormValuesTech) {
    try {
      await ticketService.updateTicketPriority(ticket.id, data.priority);
      await ticketService.updateTicketStatus(ticket.id, data.status);
      toastHandler(false, "Ticket atualizado com sucesso!");
      fetchTickets();
      setOpen(false);
    } catch {
      toastHandler(true, "Erro ao atualizar ticket!");
    }
  }

  const shouldRenderAllFields = isUserAdmin;

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.wrapper}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2} className={style.container}>
              <Grid item xs={12} md={12} className={style.closeButton}>
                <IconButton onClick={() => setOpen(false)}>
                  <CloseIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={12} md={12} className={style.item}>
                <TextField
                  className={style.inputField}
                  value={ticket.title}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  label="Título"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12} className={style.item}>
                <SelectField
                  className={style.selectField}
                  placeholder="Prioridade"
                  {...register("priority")}
                  selectName="priority"
                  items={priority}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={12} className={style.item}>
                <SelectField
                  className={style.selectField}
                  placeholder="Status"
                  {...register("status")}
                  selectName="status"
                  label="Status"
                  items={status}
                />
              </Grid>
              {shouldRenderAllFields && (
                <Grid item xs={12} md={12} className={style.item}>
                  <SelectField
                    className={style.selectField}
                    placeholder="Atribuir para"
                    {...register("assignee")}
                    fullWidth
                    selectName="assignee"
                    items={users}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={12} className={style.item}>
                <LoadingButton
                  className={style.submitButton}
                  fullWidth
                  type="submit"
                >
                  Confirmar
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export { EditTicketModal };
