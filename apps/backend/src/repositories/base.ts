abstract class BaseRepository<T> {
  public abstract getById(id: string): Promise<T | null>;
  public abstract create(payload: unknown): Promise<T>;
  public abstract update(id: string, payload: unknown): Promise<T | null>;
  public abstract remove(id: string): Promise<void>;
  public abstract list(filters: { [key: string]: unknown }): Promise<T[] | null>;
}

export abstract class ManagerRepository {}

export default BaseRepository;
