import { z } from "zod";

// Base response that all responses must follow

const BaseResponse = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  errors: z.record(z.array(z.string())).optional(),
  data: z.record(z.unknown()).optional(),
});

export const GenericSuccessResponse = <T extends z.ZodType>(itemSchema: T) => {
  return BaseResponse.extend({
    success: z.literal(true),
    message: z.string().optional(),
    errors: z.undefined(),
    data: itemSchema, // Allow data to be undefined
  });
};

export const GenericPaginatedSuccessResponse = <T extends z.ZodType>(itemSchema: T) => {
  return BaseResponse.extend({
    success: z.literal(true),
    message: z.string().optional(),
    errors: z.undefined(),
    data: itemSchema.array(), // Allow data to be undefined
    total: z.number(),
    offset: z.number(),
    limit: z.number(),
  });
};

// Error response (requires error, optional details)
export const ErrorResponse = BaseResponse.extend({
  success: z.literal(false),
  message: z.string(),
  errors: z.record(z.array(z.string())).optional(),
  data: z.undefined(),
});

// Combined response schema
/**
 * Creates a unified API response schema that can represent either a success or error response.
 * The schema discriminates based on the 'success' property.
 *
 * @param itemSchema - The Zod schema for the data property in successful responses
 * @returns A Zod union type representing either a success or error response
 */
export const ApiResponseSchema = <T extends z.ZodType>(itemSchema: T) => {
  const successResponse = GenericSuccessResponse(itemSchema);

  // Use z.discriminatedUnion to create a union type based on the 'success' property
  return z.discriminatedUnion("success", [successResponse, ErrorResponse]);
};
// Type inference
export type ApiErrorResponse = z.infer<typeof ErrorResponse>;
export type ApiSuccessResponse<T> = z.infer<ReturnType<typeof GenericSuccessResponse<z.ZodType<T>>>>;
export type ApiPaginatedSuccessResponse<T> = z.infer<ReturnType<typeof GenericPaginatedSuccessResponse<z.ZodType<T>>>>;
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
export type ApiPaginatedResponse<T> = ApiPaginatedSuccessResponse<T> | ApiErrorResponse;
