"use client";

import React from "react";
import { UserRole } from "@/domain/enums/UserRole";
import { userService } from "@/services/user-service";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputField } from "../common/InputField";
import { SelectField } from "../common/SelectField";
import {
  adminFormFields,
  priorityTypes,
  problemTypes,
  userFormFields,
} from "./constants";
import { InputSelectItems } from "@/domain/InputSelectItems";
import { ticketService } from "@/services/ticket-service";
import { MessageToast } from "../common/MessageToast";
import type { CreateTicketAdminForm, CreateTicketUserForm } from "./types";

import style from "./style.module.scss";

const CreateTicketForm: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>();
  const [users, setUsers] = React.useState<InputSelectItems[]>([]);
  const [toastMessage, setToastMessage] = React.useState({
    haveError: false,
    message: "",
  });

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  const isUserAdmin = userRole === UserRole.ADMIN;

  const formFields = isUserAdmin ? adminFormFields : userFormFields;

  const toastHaveErrorMessage = toastMessage.message.length > 0;

  const toastSeverity = toastMessage.haveError ? "error" : "success";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      await ticketService.adminCreateTicket(data);
      toastHandler(false, "Ticket criado com sucesso!");
    } catch (e) {
      toastHandler(true, "Erro ao criar ticket!");
      console.error(e);
    }
  }

  async function userOnSubmit(data: CreateTicketUserForm) {
    try {
      await ticketService.userCreateTicket(data);
      toastHandler(false, "Ticket criado com sucesso!");
    } catch (e) {
      toastHandler(true, "Erro ao criar ticket!");
      console.error(e);
    }
  }

  return (
    <div className={style.wrapper}>
      <Card className={style.container}>
        <CardContent className={style.formFieldsContainer}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <span className={style.formTitle}>Criar Ticket</span>
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
              <Grid className={style.item} item xs={12} md={6}>
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
              <Grid className={style.item} item xs={12} md={6}>
                <SelectField
                  {...register("problemType")}
                  placeholder="Defina o tipo do problema"
                  className={`${style.selectField} ${style.problemType}`}
                  selectName="problemType"
                  label="Defina o tipo do problema"
                  items={problemTypes}
                  size="small"
                />
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
              {/* <Grid className={style.item} item xs={12} md={6}></Grid> */}
              <Grid className={style.item} item xs={12} md={6}>
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
              <Grid className={style.item} item xs={12} md={6}>
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
              <Grid item md={12} xs={12}>
                <LoadingButton
                  className={style.submitButton}
                  fullWidth
                  type="submit"
                >
                  Enviar
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
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

export { CreateTicketForm };
