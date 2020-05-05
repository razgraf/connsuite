export type RegisterClassic = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  agent?: string;
};

export type LoginClassic = {
  email: string;
  password: string;
  agent?: string;
};

export type ConnectGoogle = {
  googleId: string;
  firstName: string;
  lastName: string;
  picture?: string;
  email: string;
  agent?: string;
};
