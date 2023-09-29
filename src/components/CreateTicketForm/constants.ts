import { InputSelectItems } from "@/domain/InputSelectItems";

export const problemTypes: InputSelectItems[] = [
  {
    name: "Hardware",
    value: "HARDWARE",
  },
  {
    name: "Software",
    value: "SOFTWARE",
  },
  {
    name: "Rede",
    value: "NETWORK",
  },
  {
    name: "Outros",
    value: "OTHER",
  },
];

export const priorityTypes: InputSelectItems[] = [
  {
    name: "Baixa",
    value: "LOW",
  },
  {
    name: "Média",
    value: "MEDIUM",
  },
  {
    name: "Alta",
    value: "HIGH",
  },
  {
    name: "Urgente",
    value: "URGENT",
  },
];

export const userFormFields = [
  {
    name: "title",
    label: "Título",
    type: "text",
  },
  {
    name: "problemType",
    label: "Defina o tipo do problema",
    type: "select",
    options: problemTypes,
  },
  {
    name: "description",
    label: "Descrição",
    type: "text",
  },
  {
    name: "computer_id",
    label: "Máquina",
    type: "text",
  },
];
