import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import LogoNoText from "@/../public/logo-no-text.svg";
import CheckIcon from "@mui/icons-material/Check";

import style from "./style.module.scss";
import Link from "next/link";

const App = () => {
  return (
    <Grid container className={style.container}>
      <Grid item>
        <Image src={LogoNoText} width={400} height={280} alt="Logo" />
      </Grid>
      <Grid item className={style.titles}>
        <Typography fontSize={48} variant="h1" color="white">
          Ticket Manager
        </Typography>
        <Typography fontSize={20} variant="h2" color="white">
          Software de Gerenciamento de Chamados de Manutenção
        </Typography>
      </Grid>
      <Grid item className={style.list}>
        <Typography variant="subtitle1" color="white">
          <CheckIcon fontSize="small" /> Segurança
        </Typography>
        <Typography variant="subtitle1" color="white">
          <CheckIcon fontSize="small" /> Organização
        </Typography>
        <Typography variant="subtitle1" color="white">
          <CheckIcon fontSize="small" /> Facilidade de Uso
        </Typography>
        <Typography variant="subtitle1" color="white">
          <CheckIcon fontSize="small" /> Permissões Personalizadas
        </Typography>
        <Typography variant="subtitle1" color="white">
          <CheckIcon fontSize="small" /> Eficiência no gerenciamento
        </Typography>
        <Typography variant="subtitle1" color="white">
          <CheckIcon fontSize="small" /> Acesso restrito para convidados
        </Typography>
      </Grid>
      <Grid item className={style.footer}>
        <Link href="/auth/login">
          <Button
            className={style.goToLoginButton}
            fullWidth
            variant="contained"
            color="primary"
          >
            Ir para o Login
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default App;
