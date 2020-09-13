export interface IMovie {
  id: number;
  name: string;
  rating: number;
}

export interface IMovieData {
  movie: IMovie;
}

export interface IMovieVars {
  id: number;
}

export interface ILogin {
  ID: string;
  passwordHash: string;
}

export interface IUser {
  id: number;
  name: string;
  ID: string;
  passwordHash: string;
  role: string[];
  token: string;
}

export interface ILoginData {
  login: IUser | null;
}

export interface ILoginVars {
  ID: string;
  password: string;
}

export interface ILogoutData {
  logout: boolean;
}

export interface ISignupData {
  signup: boolean;
}

export interface ISignupVars {
  name: string;
  ID: string;
  password: string;
}

export interface ICurrentUserData {
  user: IUser;
}

export interface IMoviesData {
  movies: IMovie[];
}
