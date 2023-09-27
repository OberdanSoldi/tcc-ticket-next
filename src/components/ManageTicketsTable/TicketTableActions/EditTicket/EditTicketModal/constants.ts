import { InputSelectItems } from "@/domain/InputSelectItems";

export const priority: InputSelectItems[] = [
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
];

export const status: InputSelectItems[] = [
  {
    name: "Aberto",
    value: "OPEN",
  },
  {
    name: "Em Andamento",
    value: "IN_PROGRESS",
  },
  {
    name: "Fechado",
    value: "CLOSED",
  },
];
