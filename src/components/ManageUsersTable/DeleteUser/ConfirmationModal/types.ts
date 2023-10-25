import type { User } from "@/domain/User";
import React from "react";

export interface ConfirmationModalProps {
  user: User;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  fetchUsers: () => void;
  toastHandler: (haveError: boolean, message: string) => void;
}
