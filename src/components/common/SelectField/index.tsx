import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";
import type { InputSelectProps } from "./types";

const InputSelect: React.ForwardRefRenderFunction<
  HTMLSelectElement,
  InputSelectProps
> = ({ selectName, fieldError, placeholder, items, ...rest }, ref) => {
  const isItemsValid = items?.length! > 0;
  return (
    <FormControl size="small">
      <InputLabel>{placeholder}</InputLabel>
      <Select
        id={selectName}
        label={placeholder}
        name={selectName}
        {...rest}
        ref={ref}
      >
        {isItemsValid &&
          items.map((it, index) => (
            <MenuItem key={index} value={it.value}>
              {it.name}
            </MenuItem>
          ))}
      </Select>
      {!!fieldError && <FormHelperText>{fieldError.message}</FormHelperText>}
    </FormControl>
  );
};

export const SelectField = React.forwardRef(InputSelect);
