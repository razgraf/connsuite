export enum NetworkType {
  Default = "default",
  Custom = "custom",
}

export interface Network {
  description: string;
  icon: string; //TODO
  priority: number;
  thumbnail: string; //TODO
  title: string;
  type: NetworkType;
  username: string;
  uuid: string;
}
