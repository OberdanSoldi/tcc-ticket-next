import z from "zod";
import { loginValidationSchema } from "./validationSchema";

export type IFormInput = z.infer<typeof loginValidationSchema>;
