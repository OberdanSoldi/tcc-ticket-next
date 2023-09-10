import type { BaseTextFieldProps } from "@mui/material";
import type { FieldError } from "react-hook-form";

export interface InputProps extends BaseTextFieldProps {
  inputName: string;
  fieldError?: FieldError;
  placeholder?: string;
}
