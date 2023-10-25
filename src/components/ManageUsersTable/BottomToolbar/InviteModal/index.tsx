import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

import style from "./style.module.scss";
import { InputField } from "@/components/common/InputField";
import { useForm } from "react-hook-form";
import { SelectField } from "@/components/common/SelectField";
import { InputSelectItems } from "@/domain/InputSelectItems";
import { UserRole } from "@/domain/enums/UserRole";
import { inviteService } from "@/services/invite-service";
import LoadingButton from "@mui/lab/LoadingButton";

interface InviteModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toastHandler: (haveError: boolean, message: string) => void;
}

interface InviteModalFormValues {
  email: string;
  role: string;
}

const InviteModal: React.FC<InviteModalProps> = ({
  open,
  setOpen,
  toastHandler,
}) => {
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteModalFormValues>();

  const [loading, setLoading] = React.useState(false);

  const data: InputSelectItems[] = [
    {
      name: "Administrador",
      value: UserRole.ADMIN,
    },
    {
      name: "Usuário",
      value: UserRole.USER,
    },
    {
      name: "Técnico",
      value: UserRole.TECHNICIAN,
    },
  ];

  async function submitHandler(data: InviteModalFormValues) {
    try {
      setLoading(true);
      await inviteService.invite(data.email, data.role as UserRole);
      handleClose();
      toastHandler(false, "Convite enviado com sucesso");
    } catch {
      toastHandler(true, "Erro ao enviar convite");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className={style.wrapper}>
        <div className={style.inviteModalHeader}>
          <IconButton onClick={handleClose}>
            <CloseIcon
              sx={{
                color: "white",
              }}
            />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <InputField
            inputName="email"
            label="Email"
            size="small"
            className={style.inputField}
            type="text"
            helperText={errors.email?.message}
            error={!!errors.email}
            {...register("email")}
          />
          <SelectField
            placeholder="Cargo"
            className={style.selectField}
            selectName="role"
            label="Defina o cargo"
            items={data}
            size="small"
            {...register("role")}
          />
          <LoadingButton
            loading={loading}
            className={style.submitButton}
            fullWidth
            type="submit"
          >
            Enviar Convite
          </LoadingButton>
        </form>
      </Box>
    </Modal>
  );
};

export { InviteModal };
