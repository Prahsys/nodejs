import { err, ok, type Result } from "neverthrow";

/**
 * This helper method takes in promise and results Result
 * @param {Promise<R>} promise
 * @returns {Promise<Result<R,E>>}
 */
export async function tryCatch<R, E extends Error = Error>(promise: Promise<R>): Promise<Result<R, E>> {
  try {
    return ok(await promise);
  } catch (e) {
    return err(e as E);
  }
}
