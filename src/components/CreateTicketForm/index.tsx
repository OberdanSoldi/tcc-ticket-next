import { Grid } from "@mui/material";
import React from "react";

import style from "./style.module.scss";

const CreateTicketForm: React.FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>asdasd</h1>
        <Grid container>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
          <Grid className={style.item} item md={6} xs={12}>
            <h1>Create Ticket</h1>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export { CreateTicketForm };
