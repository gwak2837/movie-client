import { makeVar } from "@apollo/client";
import { IUser } from "interfaces";

export const User = makeVar<IUser | null>(null);
