"use client";

import { Card, CardContent, Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { SelectField } from "../common/SelectField";
import { adminFormFields } from "./constants";
import { InputField } from "../common/InputField";
import { userService } from "@/services/user-service";
import { UserRole } from "@/domain/enums/UserRole";
import type { CreateTicketAdminForm, CreateTicketUserForm } from "./types";
import { LoadingButton } from "@mui/lab";

import style from "./style.module.scss";

const CreateTicketForm: React.FC = () => {
  const [userRole, setUserRole] = React.useState<UserRole>();

  React.useEffect(() => {
    userService.getUserRole().then((role) => {
      setUserRole(role);
    });
  }, []);

  const isUserAdmin = userRole === UserRole.ADMIN;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitHandler(data: unknown) {
    if (isUserAdmin) {
      adminOnSubmit(data as CreateTicketAdminForm);
    } else {
      userOnSubmit(data as CreateTicketUserForm);
    }
  }

  function adminOnSubmit(data: CreateTicketAdminForm) {
    //TODO: criar logica de submit de adm
    console.log(data);
  }

  function userOnSubmit(data: CreateTicketUserForm) {
    //TODO: criar logia de submit de user
    console.log(data);
  }

  return (
    <div className={style.wrapper}>
      <Card className={style.container}>
        <CardContent className={style.formTitle}>Criar Ticket</CardContent>
        <CardContent className={style.formFieldsContainer}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container spacing={2}>
              {adminFormFields.map((field, index) => (
                <Grid className={style.item} key={index} item md={6} xs={12}>
                  {/* <label className={style.fieldLabel}>{field.label}</label> */}
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
                      className={style.select}
                      selectName={field.name}
                      label={field.label}
                      items={field.options!}
                      size="small"
                    />
                  )}
                </Grid>
              ))}
              <Grid item md={12}>
                <LoadingButton fullWidth type="submit">
                  Enviar
                </LoadingButton>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export { CreateTicketForm };
