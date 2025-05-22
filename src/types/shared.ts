import { z } from "zod";

export const phoneNumberSchema = z
  .string()
  .regex(/^\+(?:[0-9]){6,14}[0-9]$/, "Phone number needs to be in valid E.164 format")
  .refine(
    (v) => v.length === 12 && v.startsWith("+1"),
    "Country code or number is invalid. Currently supports +1 and requires 10 digit number"
  );

export type PhoneNumber = z.infer<typeof phoneNumberSchema>;
