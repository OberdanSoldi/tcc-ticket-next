"use client";

import { useForm } from "react-hook-form";
import { type IFormInput } from "./types";
import { userService } from "@/services/user-service";

const Login = () => {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    userService
      .login({ email: data.email, password: data.password })
      .then((res) => {
        console.log("logged in");
      });

    userService.getUserTickets().then((res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="text" placeholder="Email" />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
