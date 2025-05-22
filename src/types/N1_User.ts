import { z } from "zod";
import { phoneNumberSchema } from "./shared";

export const N1UserSchema = z.object({
  id: z.string().nonempty("User Id is required."),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  phone: phoneNumberSchema.nullish(),
  email: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().nullish(),
});

export type N1_User = z.infer<typeof N1UserSchema>;
