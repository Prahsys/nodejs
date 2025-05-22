import { z } from "zod";
import { phoneNumberSchema } from "./shared";

export const N1CustomerSchema = z.object({
  id: z.string().uuid(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  phone: phoneNumberSchema.nullish(),
  email: z.string().nonempty("Customer email is required."),
  dob: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date().nullish(),
});

export type N1_Customer = z.infer<typeof N1CustomerSchema>;

export const createCustomerRequestSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: phoneNumberSchema.optional(),
  email: z.string().email(),
  dob: z.string().date("Date should be in the format of YYYY-MM-DD").optional(),
});

export type CreateCustomerRequest = z.infer<typeof createCustomerRequestSchema>;
