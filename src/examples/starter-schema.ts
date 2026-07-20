import { z } from "zod";

export const starterFormSchema = z.object({
  email: z.email("Enter a valid email address."),
});

export type StarterFormValues = z.infer<typeof starterFormSchema>;
