import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { type AlertProps } from "@mui/material/Alert";
import type { ErrorMessageBoxProps } from "./types";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MessageToast: React.FC<ErrorMessageBoxProps> = ({
  open,
  handleClose,
  severity,
  messageText,
  ...rest
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      {...rest}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {messageText}
      </Alert>
    </Snackbar>
  );
};

export { MessageToast };
