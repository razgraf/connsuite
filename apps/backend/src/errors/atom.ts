export class BaseError extends Error {
  public code: number | null = null;
  public isPrivate = false;

  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
