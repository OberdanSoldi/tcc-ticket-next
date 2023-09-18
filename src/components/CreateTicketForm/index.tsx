"use client";

import React from "react";
import { UserRole } from "@/domain/enums/UserRole";
import { userService } from "@/services/user-service";
import { LoadingButton } from "@mui/lab";
import { Card, CardContent, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputField } from "../common/InputField";
import { SelectField } from "../common/SelectField";
import { adminFormFields } from "./constants";
import { InputSelectItems } from "@/domain/InputSelectItems";
import { ticketService } from "@/services/ticket-service";
import type { CreateTicketAdminForm, CreateTicketUserForm } from "./types";

import style from "./style.module.scss";
import { MessageToast } from "../common/MessageToast";

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

  const formFields = isUserAdmin ? adminFormFields : [];

  const toastHaveErrorMessage = toastMessage.message.length > 0;

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
        haveError: false,
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

  function userOnSubmit(data: CreateTicketUserForm) {
    //TODO: criar logia de submit de user
    console.log(data);
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
              {formFields.map((field, index) => (
                <Grid className={style.item} key={index} item md={6} xs={12}>
                  {field.type === "text" && (
                    <InputField
                      {...register(field.name)}
                      inputName={field.name}
                      className={style.inputField}
                      label={field.label}
                      type={field.type}
                      size="small"
                    />
                  )}
                  {field.type === "select" && (
                    <SelectField
                      {...register(field.name)}
                      placeholder={field.label}
                      className={style.selectField}
                      selectName={field.name}
                      label={field.label}
                      items={
                        isUserAdmin && field.name === "assignee"
                          ? users
                          : field.options!
                      }
                      size="small"
                    />
                  )}
                </Grid>
              ))}
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
          open={toastMessage.haveError}
          handleClose={() => {}}
          severity={toastMessage.haveError ? "error" : "success"}
          messageText={toastMessage.message}
        />
      )}
    </div>
  );
};

export { CreateTicketForm };
