import { combineReducers, createStore } from "redux";
import { userAdvancedReducer } from "./user-advanced/userAdvancedReducer";
import { UserState } from "./user-advanced/userAdvancedTypes";
import { userReducer } from "./user/userReducer";
import { IUserState } from "./user/userTypes";

export interface IStoreState {
  user: IUserState;
  advancedUser: UserState;
}

const rootReducer = combineReducers({ user: userReducer, advancedUser: userAdvancedReducer });

export const store: any = createStore(rootReducer);
