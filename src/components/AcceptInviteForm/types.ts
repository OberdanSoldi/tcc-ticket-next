import { z } from "zod";
import { acceptInviteValidationSchema } from "./validationSchema";

export interface AcceptInviteFormProps {
  inviteId: string;
}

export type AcceptInviteFormValues = z.infer<
  typeof acceptInviteValidationSchema
>;
