"use client";

import { useForm } from "react-hook-form";
import { type IFormInput } from "./types";
import { userService } from "@/services/user-service";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/InputField";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const router = useRouter();

  async function onSubmit({ email, password }: IFormInput) {
    try {
      await userService.login({ email, password });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} type="text" placeholder="Email" />
        <InputField
          id="email"
          type="text"
          variant="outlined"
          errors={errors}
          {...register("email")}
        />
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
