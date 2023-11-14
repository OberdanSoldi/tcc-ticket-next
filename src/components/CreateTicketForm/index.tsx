"use client";

import React from "react";
import { UserRole } from "@/domain/enums/UserRole";
import { userService } from "@/services/user-service";
import { LoadingButton } from "@mui/lab";
import { Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputField } from "../common/InputField";
import { SelectField } from "../common/SelectField";
import { priorityTypes, problemTypes } from "./constants";
import { InputSelectItems } from "@/domain/InputSelectItems";
import { ticketService } from "@/services/ticket-service";
import { MessageToast } from "../common/MessageToast";
import type { CreateTicketAdminForm, CreateTicketUserForm } from "./types";

import style from "./style.module.scss";
import { useRouter } from "next/navigation";

const CreateTicketForm: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>();
  const [users, setUsers] = React.useState<InputSelectItems[]>([]);
  const [toastMessage, setToastMessage] = React.useState({
    haveError: false,
    message: "",
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  const isUserAdmin = userRole === UserRole.ADMIN;

  const isUserTechnician = userRole === UserRole.TECHNICIAN;

  const toastHaveErrorMessage = toastMessage.message.length > 0;

  const toastSeverity = toastMessage.haveError ? "error" : "success";

  React.useEffect(() => {
    if (isUserAdmin || isUserTechnician) {
      (async () => {
        const data = await userService.getUsers();
        const users = data.map((it) => {
          return {
            name: it.name,
            value: it.id,
            role: it.role,
          };
        });

        setUsers(
          users.filter(
            (it) => it.role === "Técnico" || it.role === "Administrador"
          )
        );
      })();
    }
  }, [userRole]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { push } = useRouter();

  async function submitHandler(data: unknown) {
    if (isUserAdmin) {
      await adminOnSubmit(data as CreateTicketAdminForm);
    } else {
      await userOnSubmit(data as CreateTicketUserForm);
    }
  }

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

  async function adminOnSubmit(data: CreateTicketAdminForm) {
    try {
      setLoading(true);
      await ticketService.adminCreateTicket(data);
      toastHandler(false, "Ticket criado com sucesso!");
      push("/dashboard/history");
    } catch (e) {
      toastHandler(true, "Erro ao criar ticket!");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function userOnSubmit(data: CreateTicketUserForm) {
    try {
      await ticketService.userCreateTicket(data);
      toastHandler(false, "Ticket criado com sucesso!");
      push("/dashboard/history");
    } catch (e) {
      toastHandler(true, "Erro ao criar ticket!");
      console.error(e);
    }
  }

  const shouldRenderAssigneeField = userRole === UserRole.ADMIN;

  return (
    <form className={style.wrapper} onSubmit={handleSubmit(submitHandler)}>
      <Grid container spacing={2} className={style.container}>
        <Grid className={style.title} item md={12} xs={12}>
          <Typography variant="h2" className={style.formTitle}>
            Criar Ticket
          </Typography>
        </Grid>
        <Grid className={style.item} item xs={12} md={12}>
          <InputField
            {...register("title")}
            inputName="title"
            className={style.inputField}
            label="Título"
            type="text"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid className={style.item} item xs={12} md={12} xl={12}>
          <InputField
            {...register("description")}
            inputName="description"
            className={style.inputField}
            label="Descrição"
            type="text"
            size="small"
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid className={style.item} item xs={12} md={6} xl={6}>
          <SelectField
            {...register("problemType")}
            placeholder="Defina o tipo do problema"
            className={`${style.selectField} ${style.problemType}`}
            selectName="problemType"
            label="Defina o tipo do problema"
            items={problemTypes}
            size="small"
          />
        </Grid>
        <Grid className={style.item} item xs={12} md={6} xl={6}>
          <SelectField
            {...register("priority")}
            placeholder="Prioridade"
            className={style.selectField}
            selectName="priority"
            label="Prioridade"
            items={priorityTypes}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid className={style.item} item xs={12} md={6} xl={6}>
          <InputField
            {...register("computer_id")}
            inputName="computer_id"
            className={style.inputField}
            label="Máquina"
            type="text"
            size="small"
            fullWidth
          />
        </Grid>
        {shouldRenderAssigneeField && (
          <Grid className={style.item} item xs={12} md={6} xl={6}>
            <SelectField
              {...register("assigned_to")}
              placeholder="Responsável"
              className={style.selectField}
              selectName="assigned_to"
              label="Responsável"
              items={users}
              size="small"
            />
          </Grid>
        )}
        <Grid className={style.item} item md={12} xs={12}>
          <LoadingButton
            loading={loading}
            className={style.submitButton}
            fullWidth
            type="submit"
          >
            Enviar
          </LoadingButton>
        </Grid>
      </Grid>
      {toastHaveErrorMessage && (
        <MessageToast
          open={toastHaveErrorMessage}
          handleClose={() => {}}
          severity={toastSeverity}
          messageText={toastMessage.message}
        />
      )}
    </form>
  );
};

export { CreateTicketForm };
