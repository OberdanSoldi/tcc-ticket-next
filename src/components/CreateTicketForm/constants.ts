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
    value: "baixa",
  },
  {
    name: "Média",
    value: "media",
  },
  {
    name: "Alta",
    value: "alta",
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
    name: "problem",
    label: "Defina o tipo do problema",
    type: "select",
    options: problemTypes,
  },
  {
    name: "title",
    label: "Título",
    type: "text",
  },
  {
    name: "description",
    label: "Descrição",
    type: "text",
  },
  {
    name: "machineId",
    label: "Máquina",
    type: "text",
  },
  {
    name: "priority",
    label: "Prioridade",
    type: "select",
    options: priorityTypes,
  },
  {
    name: "assignee",
    label: "Responsável",
    type: "select",
    options: assigneeTypes,
  },
];
