import { err, ok, Result } from "neverthrow";
import { PrahsysError } from "./prahsys.error";
import { tryCatch } from "./trycatch";
import { ApiResponse } from "./types/api";
import { Merchant } from "./types/index";
import { CreateCustomerRequest } from "./types/N1_Customer";

export type PrahsysResult<T> = Result<T, PrahsysError>;

export type PrahsysOpts = { namespace?: "n1"; baseUrl: string };
export class Prahsys {
  private readonly apiKey;

  private readonly headers;

  private readonly baseUrl;

  readonly namespace;

  readonly merchants = { get: this.getMerchant.bind(this) };

  readonly customers = { create: this.createCustomer.bind(this) };

  readonly users = {};

  constructor(apiKey: string, opts?: PrahsysOpts) {
    this.apiKey = apiKey;
    this.headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    } satisfies RequestInit["headers"];
    this.namespace = opts?.namespace ?? "n1";
    this.baseUrl = opts?.baseUrl ?? "https://api.prahsys.com";
  }

  // #region Merchant Methods
  /**
   * Returns a merchant object by id.
   * @param {{merchantId: string}} args
   * @returns {PrahsysResult<ApiResponse<Merchant>>}
   */
  private async getMerchant({ merchantId }: { merchantId: string }): Promise<PrahsysResult<ApiResponse<Merchant>>> {
    return (await this.httpRequest({ type: "merchant", path: `merchant/${merchantId}`, method: "GET" })).map(
      (e) => e as ApiResponse<Merchant>
    );
  }
  // #endregin Merchant Methods

  // #region Customers
  private async createCustomer(args: CreateCustomerRequest) {
    return (await this.httpRequest({ type: "merchant", path: `customer`, method: "POST", body: JSON.stringify(args) })).map(
      (e) => e as ApiResponse<Merchant>
    );
  }
  // #endregion

  private async httpRequest({
    type,
    path,
    method,
    body,
  }: {
    type: "merchant" | "payment";
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    body?: RequestInit["body"];
  }): Promise<PrahsysResult<unknown>> {
    const response = await tryCatch(fetch(`${this.baseUrl}/${type}/${this.namespace}/${path}`, { method, headers: this.headers, body }));

    if (response.isErr())
      return err(new PrahsysError({ code: "UNKNOWN", message: `Fetch exception occured with error: ${response.error.message}` }));

    const resBody = await tryCatch(response.value.json());

    if (resBody.isErr())
      return err(
        new PrahsysError({
          code: "UNPROCESSABLE_CONETENT",
          message: `Deserializing json body failed with error: ${resBody.error.message}`,
        })
      );

    if (!response.value.ok) return err(PrahsysError.fromResponse(response.value, resBody.value));

    return ok(resBody.value);
  }
}
