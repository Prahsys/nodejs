import { z } from "zod";
import { phoneNumberSchema } from "./shared.js";

export const MerchantOrganizationTypeEnum = z.enum(["LIVE", "SANDBOX"]);

export const MerchantStatusEnum = z.enum([
  "ONBOARDING_TO_GATEWAY",
  "WAITLISTED",
  "APPROVED_SANDBOX",
  "APPLICATION_PENDING",
  "APPLICATION_IN_REVIEW",
  "APPLICATION_INFORMATION_REQUESTED",
  "APPLICATION_ABANDONED",
  "APPLICATION_APPROVED",
  "APPLICATION_DENIED",
  "APPLICATION_REQUIRES_DOCUMENT_SUBMISSION",
  "APPLICATION_AWAITING_DIGITAL_SIGNATURE",
]);

export const N1MerchantSchema = z.object({
  id: z.string().nonempty("Merchant Id is required. This should be the organization.id"),
  name: z.string().nonempty("Name is required. This should be the organization name from clerk"),
  slug: z.string().nullish(),
  applicationId: z.number().nullish(),
  createdAt: z.coerce.date(),
  readyForProcessing: z.boolean(),
  signed: z.boolean(),
  type: MerchantOrganizationTypeEnum,
  enabledDirectPay: z.date().nullish(),
  status: MerchantStatusEnum,
  statusUpdatedAt: z.date().nullish(),
  cardPresentTerminalIds: z.array(z.string()),
  cardNotPresentTerminalIds: z.array(z.string()),
  primaryContactEmail: z.string(),
  primaryContactPhone: phoneNumberSchema,
  primaryContactFirstName: z.string(),
  primaryContactLastName: z.string(),
  signingUrl: z.string().nullable(),
});

export type N1_Merchant = z.infer<typeof N1MerchantSchema>;
