import { Card, CardContent } from "@mui/material";
import style from "./style.module.scss";
import { InputField } from "../common/InputField";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@mui/lab";
import { passwordService } from "@/services/password-service";
import { MessageToast } from "../common/MessageToast";
import React from "react";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
  requestId: string;
}

const ResetPasswordForm = ({ requestId }: ResetPasswordFormProps) => {
  const validationSchema = z.object({
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    password_confirmation: z
      .string()
      .min(6, "Senha deve ter no mínimo 6 caracteres"),
  });

  type ResetPasswordFormData = z.infer<typeof validationSchema>;

  const useFormConfig = {
    resolver: zodResolver(validationSchema),
    initialValues: {
      password: "",
      password_confirmation: "",
    },
  };

  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>(useFormConfig);

  const [toastMessage, setToastMessage] = React.useState({
    haveError: false,
    message: "",
  });

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

  async function submitHandler(data: ResetPasswordFormData) {
    try {
      await passwordService.resetPassword(
        requestId,
        data.password,
        data.password_confirmation
      );
      toastHandler(false, "Senha redefinida com sucesso!");
      push("/auth/login");
    } catch {
      toastHandler(true, "Erro ao redefinir senha!");
    }
  }

  return (
    <div className={style.wrapper}>
      <Card className={style.card}>
        <CardContent className={style.cardImage}>
          <h2>Redefinição de senha</h2>
        </CardContent>
        <CardContent>
          <form onSubmit={handleSubmit(submitHandler)}>
            <InputField
              inputName="password"
              label="Nova senha"
              type="password"
              helperText={errors.password?.message}
              className={`${style.inputField} ${style.spacing}`}
              error={!!errors.password}
              {...register("password")}
              size="small"
            />
            <InputField
              inputName="password_confirmation"
              label="Confirmação de senha"
              type="password"
              helperText={errors.password_confirmation?.message}
              className={`${style.inputField} ${style.spacing}`}
              error={!!errors.password_confirmation}
              {...register("password_confirmation")}
              size="small"
            />
            <LoadingButton className={style.loginButton} type="submit">
              Redefinir
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

export { ResetPasswordForm };
