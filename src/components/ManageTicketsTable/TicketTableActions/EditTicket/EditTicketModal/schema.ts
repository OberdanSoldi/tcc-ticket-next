import { z } from "zod";

const editFormSchema = z.object({
  priority: z.string(),
  status: z.string(),
  assignee: z.string(),
});

const editFormTechSchema = z.object({
  priority: z.string(),
  status: z.string(),
});

export { editFormSchema, editFormTechSchema };
