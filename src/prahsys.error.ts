import { ApiErrorResponse } from "./types/api";

export const PRAHSYS_ERROR_TYPES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  UNPROCESSABLE_CONETENT: 422,
  INTERNAL_SERVER_ERROR: 500,
  UNKNOWN: 500,
} as const;

export const PRAHSYS_ERROR_STATUS = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  404: "NOT_FOUND",
  422: "UNPROCESSABLE_CONETENT",
  500: "INTERNAL_SERVER_ERROR",
} as const;

export type PrahsysErrorTypes = typeof PRAHSYS_ERROR_TYPES;
export type PrahsysErrorCodes = keyof PrahsysErrorTypes;

export class PrahsysError extends Error {
  readonly code: PrahsysErrorCodes;
  readonly status: PrahsysErrorTypes[PrahsysErrorCodes];
  readonly details: unknown;

  constructor({ code, message, details }: { code: PrahsysErrorCodes; message: string; details?: unknown }) {
    super(message);
    this.code = code;
    this.status = PRAHSYS_ERROR_TYPES[code];
    this.details = details;
    this.name = "PrahsysError";
  }

  static fromResponse(res: Response, resBody: unknown): PrahsysError {
    return new PrahsysError({
      code: PRAHSYS_ERROR_STATUS[res.status as keyof typeof PRAHSYS_ERROR_STATUS] ?? "INTERNAL_SERVER_ERROR",
      message: (resBody as ApiErrorResponse).message,
      details: resBody,
    });
  }
}
