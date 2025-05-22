import { z } from "zod";
import { phoneNumberSchema } from "./shared";

export const ChannelPartnerOrganizationTypeEnum = z.enum(["CHANNEL_PARTNER"]);

export const CategoryTypeEnum = z.enum(["MOTO", "RETAIL"]);

export const N1ChannelPartnerSchema = z.object({
  id: z.string().nonempty("Channel Partner Id is required. This should be the organization.id"),
  name: z.string().nonempty("Name is required. This should be the organization name from clerk"),
  slug: z.string().nullish(),
  website: z.string().nullish(),
  productSold: z.string().nullish(),
  visaMastercardCpRate: z.number(),
  visaMastercardCpFee: z.number(),
  discoverCpRate: z.number(),
  discoverCpFee: z.number(),
  amexCpRate: z.number(),
  amexCpFee: z.number(),
  visaMastercardCnpRate: z.number(),
  visaMastercardCnpFee: z.number(),
  discoverCnpRate: z.number(),
  discoverCnpFee: z.number(),
  amexCnpRate: z.number(),
  logo: z.string().nullish(),
  primaryContactEmail: z.string(),
  primaryContactPhone: phoneNumberSchema,
  primaryContactFirstName: z.string(),
  primaryContactLastName: z.string(),
  type: ChannelPartnerOrganizationTypeEnum,
  createdAt: z.date(),
});

export type N1_ChannelPartner = z.infer<typeof N1ChannelPartnerSchema>;
