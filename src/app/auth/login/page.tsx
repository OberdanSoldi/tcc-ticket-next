"use client";

import { useForm } from "react-hook-form";
import { type IFormInput } from "./types";
import { userService } from "@/services/user-service";
import { useRouter } from "next/navigation";

const Login = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();

  async function onSubmit({ email, password }: IFormInput) {
    await userService.login({ email, password });
    router.push("/dashboard");
  }

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
