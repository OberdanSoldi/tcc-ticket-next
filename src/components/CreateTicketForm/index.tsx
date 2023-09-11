"use client";

import { Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { SelectField } from "../common/SelectField";
import type { InputSelectItems } from "@/domain/InputSelectItems";

import style from "./style.module.scss";
import { adminFormFields } from "./constants";
import { InputField } from "../common/InputField";

const CreateTicketForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  const roger: InputSelectItems[] = [
    {
      name: "Roger1",
      value: "roger1",
    },
    {
      name: "Roger2",
      value: "roger2",
    },
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h1>asdasd</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            {adminFormFields.map((field, index) => (
              <Grid className={style.item} key={index} item md={6} xs={12}>
                {field.type === "text" && (
                  <InputField
                    {...register(field.name)}
                    inputName={field.name}
                    label={field.label}
                    type={field.type}
                    size="small"
                  />
                )}
                {field.type === "select" && (
                  <SelectField
                    {...register(field.name)}
                    placeholder={field.label}
                    className={style.select}
                    selectName={field.name}
                    label={field.label}
                    items={field.options!}
                    size="small"
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </form>
      </div>
    </div>
  );
};

export { CreateTicketForm };
