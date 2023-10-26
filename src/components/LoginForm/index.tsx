"use client";

import { useForm } from "react-hook-form";
import { type IFormInput } from "./types";
import { userService } from "@/services/user-service";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/common/InputField";
import { Card, CardContent } from "@mui/material";
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
    <div className={style.wrapper}>
      <Card className={style.card}>
        <CardContent className={style.cardImage}>
          <Image src={Logo} alt="Logo" />
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
            <InputField
              inputName="password"
              label="Password"
              size="small"
              className={style.inputField}
              type="password"
              helperText={errors.password?.message}
              error={!!errors.password}
              {...register("password")}
            />
            <a
              href="/auth/request-reset-password"
              className={`${style.forgotPassword} ${style.spacing}`}
            >
              Esqueceu sua senha?
            </a>
            <LoadingButton
              loading={loading}
              className={style.loginButton}
              variant="contained"
              type="submit"
            >
              Login
            </LoadingButton>
          </form>
          {toastError.haveError && (
            <MessageToast
              open={toastError.haveError}
              handleClose={() => {}}
              severity="error"
              messageText={toastError.message}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export { LoginForm };
