import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { combineReducers, install } from "redux-loop";

import { userAdvancedReducer } from "./user-advanced/userAdvancedReducer";
import { UserState } from "./user-advanced/userAdvancedTypes";

import { userReducer } from "./user/userReducer";
import { IUserState } from "./user/userTypes";

import { validatedReducer } from "./validated/validatedReducer";
import { PersonState } from "./validated/validatedTypes";

import { lensReducer } from './lenses/lensReducer'
import { LensState } from "./lenses/lensTypes"

export interface IStoreState {
  user: IUserState;
  advancedUser: UserState;
  validated: PersonState;
  lens: LensState;
}

const rootReducer: any = combineReducers({
  user: userReducer,
  advancedUser: userAdvancedReducer,
  validated: validatedReducer,
  lens: lensReducer
});

export const store: any = createStore(rootReducer, composeWithDevTools(install()));
