import React from "react";
import type { InputProps } from "./types";

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error, placeholder, type, ...rest },
  ref
) => {
  return (
    <>
      <input
        name={name}
        type={type}
        ref={ref}
        placeholder={placeholder}
        {...rest}
      />
      {!!error && <span>{error.message}</span>}
    </>
  );
};

export const InputField = React.forwardRef(Input);
