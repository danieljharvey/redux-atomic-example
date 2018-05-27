import { createAtomic } from "redux-atomic";

export interface IUserState {
  users: IUser[];
  nextUserID: number;
  editUser: IUser;
}

export interface IUser {
  userID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
}

const defaultUser: IUser = {
  dateOfBirth: null,
  firstName: "",
  lastName: "",
  userID: 0
};

const initialState: IUserState = {
  editUser: defaultUser,
  nextUserID: 1,
  users: []
};

const setFirstName = (firstName: string) => (state: IUserState): IUserState => ({
  ...state,
  editUser: {
    ...state.editUser,
    firstName
  }
});

const setLastName = (lastName: string) => (state: IUserState): IUserState => ({
  ...state,
  editUser: {
    ...state.editUser,
    lastName
  }
});

const addUser = () => (state: IUserState): IUserState => {
  const user = {
    ...state.editUser,
    userID: state.nextUserID
  };
  return clearForm({
    ...state,
    users: state.users.concat([user])
  });
};

const clearForm = (state: IUserState): IUserState => ({
  ...state,
  editUser: defaultUser,
  nextUserID: state.nextUserID + 1
});

const removeUser = (userID: number) => (state: IUserState): IUserState => ({
  ...state,
  users: state.users.filter(user => user.userID !== userID)
});

const { reducer, wrap } = createAtomic("User", initialState, [
  addUser,
  removeUser,
  setFirstName,
  setLastName
]);

export const userReducer = reducer;
export const actions = {
  onAddUser: wrap(addUser),
  onRemoveUser: wrap(removeUser),
  onSetFirstName: wrap(setFirstName),
  onSetLastName: wrap(setLastName)
};
