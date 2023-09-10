import React from "react";
import type { InputProps } from "./types";
import { BaseTextFieldProps, TextField } from "@mui/material";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { fieldError, placeholder, type, inputName, ...rest },
  ref
) => {
  return (
    <>
      <TextField
        ref={ref}
        id={inputName}
        name={inputName}
        placeholder={placeholder}
        type={type}
        {...rest}
      />
      {!!fieldError && <span>{fieldError.message}</span>}
    </>
  );
};

export const InputField = React.forwardRef(Input);
