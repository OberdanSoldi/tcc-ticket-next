import { useForm } from "react-hook-form";
import { type IFormInput } from "./types";
import { userService } from "@/services/user-service";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/InputField";
import { AxiosError } from "axios";

const LoginForm: React.FC = () => {
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
      if (error instanceof AxiosError) {
        setError("email", {
          type: "manual",
          message: error.response?.data?.message,
        });
      }
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          type="text"
          placeholder="Email"
          error={errors.email}
          {...register("email")}
        />
        <InputField
          type="password"
          placeholder="Password"
          error={errors.password}
          {...register("password")}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export { LoginForm };
