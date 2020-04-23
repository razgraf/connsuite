export class BaseError extends Error {
  public code: number | null = null;
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
