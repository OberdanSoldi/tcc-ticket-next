import { InputSelectItems } from "@/domain/InputSelectItems";

const problemTypes: InputSelectItems[] = [
  {
    name: "Hardware",
    value: "hardware",
  },
  {
    name: "Software",
    value: "software",
  },
  {
    name: "Rede",
    value: "rede",
  },
];

const priorityTypes: InputSelectItems[] = [
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

const assigneeTypes: InputSelectItems[] = [
  {
    name: "João",
    value: "joao",
  },
  {
    name: "Maria",
    value: "maria",
  },
];

export const adminFormFields = [
  {
    name: "title",
    label: "Título",
    type: "text",
  },
  {
    name: "problem",
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
    name: "priority",
    label: "Prioridade",
    type: "select",
    options: priorityTypes,
  },
  {
    name: "computer_id",
    label: "Máquina",
    type: "text",
  },
  {
    name: "assigned_to",
    label: "Responsável",
    type: "select",
    options: assigneeTypes,
  },
];

export const userFormFields = [
  {
    name: "title",
    label: "Título",
    type: "text",
  },
  {
    name: "problem",
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
