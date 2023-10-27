"use client";

import { useForm } from "react-hook-form";
import { type IFormInput } from "./types";
import { userService } from "@/services/user-service";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/common/InputField";
import { Card, CardContent, Grid } from "@mui/material";
import Image from "next/image";
import { MessageToast } from "../common/MessageToast";
import React from "react";
import { useFormConfig } from "./constants";

import style from "./style.module.scss";
import Logo from "@/../public/logo.png";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>(useFormConfig);
  const router = useRouter();

  const [toastError, setToastError] = React.useState({
    haveError: false,
    message: "",
  });

  const [loading, setLoading] = React.useState(false);

  async function onSubmit({ email, password }: IFormInput) {
    try {
      setLoading(true);
      await userService.login({ email, password });
      router.push("/dashboard");
    } catch (error) {
      setToastError({
        haveError: true,
        message: "Erro ao fazer login",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToastError({
          haveError: false,
          message: "",
        });
      }, 2000);
    }
  }

  return (
    <form className={style.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <Grid className={style.container} container gap={3}>
        <Grid className={style.item} item xs={12} md={12}>
          <Image src={Logo} alt="Logo" />
        </Grid>
        <Grid className={style.item} item xs={12} md={12}>
          <InputField
            inputName="email"
            label="Email"
            size="small"
            className={`${style.inputField} ${style.spacing}`}
            type="text"
            helperText={errors.email?.message}
            error={!!errors.email}
            {...register("email")}
            fullWidth
          />
        </Grid>
        <Grid className={`${style.item} ${style.fgPass}`} item xs={12} md={12}>
          <InputField
            inputName="password"
            label="Password"
            size="small"
            className={style.inputField}
            type="password"
            helperText={errors.password?.message}
            error={!!errors.password}
            {...register("password")}
            fullWidth
          />
          <a
            href="/auth/request-reset-password"
            className={`${style.forgotPassword} ${style.spacing}`}
          >
            Esqueceu sua senha?
          </a>
        </Grid>
        <Grid className={style.item} item xs={12} md={12}>
          <LoadingButton
            loading={loading}
            className={style.loginButton}
            variant="contained"
            type="submit"
            fullWidth
          >
            Login
          </LoadingButton>
        </Grid>
      </Grid>
      {toastError.haveError && (
        <MessageToast
          open={toastError.haveError}
          handleClose={() => {}}
          severity="error"
          messageText={toastError.message}
        />
      )}
    </form>
  );
};

export { LoginForm };
