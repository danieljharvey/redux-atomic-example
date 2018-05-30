import { createAtomic } from "redux-atomic";
import { IUser, IUserState } from "./userTypes";

// this is an entire Redux Atomic reducer
// actions and reducer and combined together

// setting initialState
const defaultUser: IUser = {
  dateOfBirth: null,
  firstName: "",
  lastName: "",
  userID: 0
};

export const initialState: IUserState = {
  editUser: defaultUser,
  nextUserID: 1,
  users: []
};

// Reducer action functions that we will be using
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

const addUser = () => (state: IUserState): IUserState =>
  clearForm({
    ...state,
    users: state.users.concat([
      {
        ...state.editUser,
        userID: state.nextUserID
      }
    ])
  });

const removeUser = (userID: number) => (state: IUserState): IUserState => ({
  ...state,
  users: state.users.filter(user => user.userID !== userID)
});

// this is not an action, rather a helper function used by addUser
// breaking stuff down allows us to name the separate things happening
// and use good naming to explain what is happening

const clearForm = (state: IUserState): IUserState => ({
  ...state,
  editUser: defaultUser,
  nextUserID: state.nextUserID + 1
});

// this creates the reducer, it takes:
// - a name (must be unique
// - the initial state
// - an array of reducer action functions (from above)

const { reducer, wrap } = createAtomic("User", initialState, [
  addUser,
  removeUser,
  setFirstName,
  setLastName
]);

// it returns two things:
// - the reducer for exporting and combining etc
// - a wrap function for creating actions from your reducer actions

export const userReducer = reducer;

// these actions can now be dispatched as normal
export const actions = {
  onAddUser: wrap(addUser),
  onRemoveUser: wrap(removeUser),
  onSetFirstName: wrap(setFirstName),
  onSetLastName: wrap(setLastName)
};
