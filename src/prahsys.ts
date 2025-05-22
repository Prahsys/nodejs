import { Result } from "neverthrow";
import { PrahsysError } from "./prahsys.error.js";

export const PRAHSYS_BASE = "https://api.prahsys.com";

export type PrahsysResult<T> = Result<T, PrahsysError>;

export class Prahsys {
  private readonly apiKey;

  readonly merchants = {};

  readonly customers = {};

  readonly users = {};

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // #region Merchants Methods
  private getMerchant({ merchantId }: { merchantId: string }) {}
}
