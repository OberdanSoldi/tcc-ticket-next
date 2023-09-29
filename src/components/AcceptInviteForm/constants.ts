import { zodResolver } from "@hookform/resolvers/zod";
import { acceptInviteValidationSchema } from "./validationSchema";

export const useFormConfig = {
  resolver: zodResolver(acceptInviteValidationSchema),
  initialValues: {
    name: "",
    password: "",
  },
};
