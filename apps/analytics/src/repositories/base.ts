export type BaseOptions = {
  populate?: boolean;
  admin?: boolean;

  limit?: number | string;
  offset?: number | string;

  from?: string;
  to?: string;

  [key: string]: boolean | number | string | undefined;
};

abstract class BaseRepository<T> {
  public abstract getById(id: string, options?: BaseOptions): Promise<T | null>;
  public abstract create(payload: unknown): Promise<T>;
  public abstract update(id: string, payload: unknown): Promise<T | null>;
  public abstract remove(id: string): Promise<void>;
  public abstract list(filters: { [key: string]: unknown }): Promise<T[] | null>;
}

export abstract class ManagerRepository {}

export default BaseRepository;
