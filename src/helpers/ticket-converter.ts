import type { Ticket } from "@/domain/Ticket";
import { userService } from "@/services/user-service";
import { format } from "date-fns";

class TicketConverter {
  convertToPortuguese(tickets: Ticket[] = []): Ticket[] {
    return tickets
      .map((it) => {
        switch (it.status.toLowerCase()) {
          case "not_defined":
          case "open":
            return {
              ...it,
              status: "Aberto",
            };
          case "closed":
            return {
              ...it,
              status: "Fechado",
            };
          case "in_progress":
            return {
              ...it,
              status: "Em andamento",
            };
          default:
            return it;
        }
      })
      .map((it) => {
        switch (it.priority.toLowerCase()) {
          case "not_defined":
          case "low":
            return {
              ...it,
              priority: "Baixa",
            };
          case "medium":
            return {
              ...it,
              priority: "Média",
            };
          case "high":
            return {
              ...it,
              priority: "Alta",
            };
          case "urgent":
            return {
              ...it,
              priority: "Urgente",
            };
          default:
            return it;
        }
      })
      .map((it) => {
        switch (it.problemType.toLowerCase()) {
          case "hardware":
            return {
              ...it,
              problemType: "Hardware",
            };
          case "software":
            return {
              ...it,
              problemType: "Software",
            };
          case "network":
            return {
              ...it,
              problemType: "Rede",
            };
          case "other":
            return {
              ...it,
              problemType: "Outro",
            };
          default:
            return it;
        }
      })
      .map((it) => {
        return {
          ...it,
          date: format(new Date(it.date), "dd/MM/yyyy - HH:mm"),
        };
      });
  }
}
const ticketConverter = new TicketConverter();
export { ticketConverter };
