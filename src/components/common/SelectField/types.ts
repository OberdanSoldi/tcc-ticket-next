import type { InputSelectItems } from "@/domain/InputSelectItems";
import type { SelectProps } from "@mui/material";
import type { FieldError } from "react-hook-form";

export interface InputSelectProps extends SelectProps {
  selectName: string;
  fieldError?: FieldError;
  placeholder?: string;
  items: InputSelectItems[];
}
