import React from "react";
import type { IInputFieldProps } from "./types";
import { FormHelperText, Input } from "@mui/joy";

const InputField: React.FC<IInputFieldProps> = ({
  id,
  type,
  variant,
  error,
  ...rest
}) => {
  return (
    <>
      <Input id={id} type={type} variant={variant} {...rest} />
      {error && <FormHelperText>{error?.message}</FormHelperText>}
    </>
  );
};

export { InputField };
