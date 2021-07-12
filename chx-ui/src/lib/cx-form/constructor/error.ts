export class CxFormError extends Error {
  constructor(msg: string) {
    super(`CxFormError: ${msg}`);
  }
}
