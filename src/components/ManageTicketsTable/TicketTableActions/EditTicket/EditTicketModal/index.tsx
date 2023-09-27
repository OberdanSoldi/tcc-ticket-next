import { Ticket } from "@/domain/Ticket";
import React from "react";
import { EditTicketFormValues, EditTicketModalProps } from "./types";
import { Box, Grid, Modal, Typography } from "@mui/material";
import { SelectField } from "@/components/common/SelectField";
import { priority, status } from "./constants";
import { InputSelectItems } from "@/domain/InputSelectItems";

import style from "./style.module.scss";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema } from "./schema";
import { ticketService } from "@/services/ticket-service";
import { MessageToast } from "@/components/common/MessageToast";

const EditTicketModal: React.FC<EditTicketModalProps> = ({
  open,
  setOpen,
  ticket,
  fetchTickets,
  toastHandler,
}) => {
  const [users, setUsers] = React.useState<InputSelectItems[]>([]);
  const [userRole, setUserRole] = React.useState<UserRole>();

  const { register, handleSubmit } = useForm<EditTicketFormValues>({
    resolver: zodResolver(editFormSchema),
  });

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

  async function submitHandler(data: EditTicketFormValues) {
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
            <Grid container>
              <Grid item xs={12} md={12}>
                <SelectField
                  {...register("priority")}
                  fullWidth
                  selectName="priority"
                  items={priority}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <SelectField
                  {...register("status")}
                  fullWidth
                  selectName="status"
                  items={status}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <SelectField
                  {...register("assignee")}
                  fullWidth
                  selectName="assignee"
                  items={users}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <LoadingButton type="submit">Confirmar</LoadingButton>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export { EditTicketModal };
