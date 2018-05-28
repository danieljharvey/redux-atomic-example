import { combineReducers, createStore } from "redux";

import { userAdvancedReducer } from "./user-advanced/userAdvancedReducer";
import { UserState } from "./user-advanced/userAdvancedTypes";

import { userReducer } from "./user/userReducer";
import { IUserState } from "./user/userTypes";

import { validatedReducer } from "./validated/validatedReducer";
import { PersonState } from "./validated/validatedTypes";

export interface IStoreState {
  user: IUserState;
  advancedUser: UserState;
  validated: PersonState;
}

const rootReducer = combineReducers({
  user: userReducer,
  advancedUser: userAdvancedReducer,
  validated: validatedReducer
});

export const store: any = createStore(rootReducer);
