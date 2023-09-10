import type { AlertColor, SnackbarProps } from "@mui/material";

export interface ErrorMessageBoxProps extends SnackbarProps {
  handleClose: () => void;
  severity: AlertColor;
  messageText: string;
}
