import { InputProps } from "@mui/joy";
import type { HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import type {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

export interface IInputFieldProps
  extends HtmlHTMLAttributes<InputHTMLAttributes> {
  id: string;
  label: string;
  errors: FieldErrors<FieldValues>;
  error: string;
}
