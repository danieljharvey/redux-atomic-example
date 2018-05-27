import { combineReducers, createStore } from "redux";
import { userAdvancedReducer, UserState } from "./user-advanced/userAdvancedReducer";
import { IUserState, userReducer } from "./user/userReducer";

export interface IStoreState {
  user: IUserState;
  advancedUser: UserState;
}

const rootReducer = combineReducers({ user: userReducer, advancedUser: userAdvancedReducer });

export const store: any = createStore(rootReducer);
