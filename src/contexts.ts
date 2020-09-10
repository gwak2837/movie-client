import { createContext } from 'react';
import { IUserContext } from 'interfaces';

export const UserContext = createContext<IUserContext>({
  user: {},
  setUser: (user) => user,
});
