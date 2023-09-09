import { zodResolver } from "@hookform/resolvers/zod";
import { loginValidationSchema } from "./validationSchema";

export const useFormConfig = {
  resolver: zodResolver(loginValidationSchema),
  defaultValues: {
    email: "",
    password: "",
  },
};
