import { Button, Card, CardContent } from "@mui/material";
import { useForm } from "react-hook-form";
import { InputField } from "../common/InputField";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { passwordService } from "@/services/password-service";
import React from "react";
import { MessageToast } from "../common/MessageToast";

import style from "./style.module.scss";
import { useRouter } from "next/navigation";

interface RequestResetPasswordFormData {
  email: string;
}

const RequestResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RequestResetPasswordFormData>();

  const [loading, setLoading] = React.useState(false);

  const [toastMessage, setToastMessage] = React.useState({
    haveError: false,
    message: "",
  });

  const { push } = useRouter();

  async function onSubmit(data: RequestResetPasswordFormData) {
    try {
      setLoading(true);
      await passwordService.requestReset(data.email);
      toastHandler(false, "Email enviado com sucesso!");
      await push("/auth/login");
    } catch {
      toastHandler(true, "Erro ao enviar email!");
    } finally {
      setValue("email", "");
      setLoading(false);
    }
  }

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

  return (
    <div className={style.wrapper}>
      <Card className={style.card}>
        <CardContent className={style.cardImage}>
          <h2>Recuperação de Senha</h2>
        </CardContent>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              inputName="email"
              label="Email"
              size="small"
              className={`${style.inputField} ${style.spacing}`}
              type="text"
              helperText={errors.email?.message}
              error={!!errors.email}
              {...register("email")}
            />
            <LoadingButton
              className={style.loginButton}
              variant="contained"
              type="submit"
              loading={loading}
            >
              Recuperar
            </LoadingButton>
            <Link className={style.link} href="/auth/login">
              <Button>Voltar</Button>
            </Link>
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

export { RequestResetPasswordForm };
