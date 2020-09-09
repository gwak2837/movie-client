export interface IMovie {
  id: number;
  name: string;
  rating?: number;
}

export interface IUserContext {
  user: IUser;
  setUser: (user: IUser) => IUser;
}

export interface IUser {
  id?: number;
    name?: string;
    ID?: string;
    passwordHash?: string;
    role?: string[];
    token?: string;
}