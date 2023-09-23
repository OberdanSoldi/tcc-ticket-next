import { z } from "zod";

export const createTicketAdminValidationSchema = z.object({
  problemType: z.string().nonempty("Please select a problem type"),
  title: z.string().nonempty("Please enter a title"),
  description: z.string().nonempty("Please enter a description"),
  computer_id: z.string().nonempty("Please enter a machine ID"),
  priority: z.string().nonempty("Please select a priority"),
  assigned_to: z.string().nonempty("Please select an assignee"),
});

export const createTicketUserValidationSchema = z.object({
  problemType: z.string().nonempty("Please select a problem type"),
  title: z.string().nonempty("Please enter a title"),
  description: z.string().nonempty("Please enter a description"),
  machineId: z.string().nonempty("Please enter a machine ID"),
});
