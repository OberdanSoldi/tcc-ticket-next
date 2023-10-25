import { Card, CardContent } from "@mui/material";
import type { AcceptInviteFormValues, AcceptInviteFormProps } from "./types";
import Image from "next/image";
import { InputField } from "../common/InputField";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { useFormConfig } from "./constants";
import { inviteService } from "@/services/invite-service";
import React from "react";
import { MessageToast } from "../common/MessageToast";
import { useRouter } from "next/navigation";

import style from "./style.module.scss";

const AcceptInviteForm: React.FC<AcceptInviteFormProps> = ({ inviteId }) => {
  const [toastMessage, setToastMessage] = React.useState({
    haveError: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AcceptInviteFormValues>(useFormConfig);

  const { push } = useRouter();

  const toastHaveErrorMessage = toastMessage.message.length > 0;

  const toastSeverity = toastMessage.haveError ? "error" : "success";

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

  async function submitHandler(data: AcceptInviteFormValues) {
    try {
      await inviteService.getInvite({ id: inviteId, ...data });
      toastHandler(false, "Convite aceito com sucesso!");
      push("/auth/login");
    } catch (ex) {
      toastHandler(true, "Erro ao aceitar convite!");
      console.error(ex);
    }
  }

  return (
    <div className={style.wrapper}>
      <Card className={style.card}>
        <CardContent className={style.cardImage}>
          <h2>Concluir Cadastro</h2>
        </CardContent>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <InputField
              inputName="name"
              label="Nome"
              size="small"
              className={`${style.inputField} ${style.spacing}`}
              type="text"
              helperText={errors.name?.message}
              error={!!errors.name}
              {...register("name")}
            />
            <InputField
              inputName="password"
              label="Senha"
              size="small"
              className={`${style.inputField} ${style.spacing}`}
              type="password"
              helperText={errors.password?.message}
              error={!!errors.password}
              {...register("password")}
            />
            <LoadingButton
              className={style.loginButton}
              variant="contained"
              type="submit"
            >
              Criar conta
            </LoadingButton>
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

export { AcceptInviteForm };
