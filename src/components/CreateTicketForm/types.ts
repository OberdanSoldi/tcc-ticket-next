import { z } from "zod";
import {
  createTicketAdminValidationSchema,
  createTicketUserValidationSchema,
} from "./validationSchema";

export type CreateTicketAdminForm = z.infer<
  typeof createTicketAdminValidationSchema
>;
export type CreateTicketUserForm = z.infer<
  typeof createTicketUserValidationSchema
>;
