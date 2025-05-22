export class PrahsysError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PrahsysError";
  }
}
