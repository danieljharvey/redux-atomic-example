import { createAtomic } from "redux-atomic";
import { compose } from "../utils/compose";
import { User, UserState, UserStateValidator } from "./userAdvancedTypes";

// this demo is how the Redux Atomic style makes it easy to break your reducers down
// into smaller parts for things like validation
// here io-ts is used to validate the new state - if it doesn't typecheck anymore -
// - it's not coming in

// default state
const defaultUser: User = {
  age: 0,
  firstName: "",
  lastName: "",
  userID: 0
};

const advancedInitialState: UserState = {
  editUser: defaultUser,
  nextUserID: 1,
  users: []
};

// partial helper functions
// these are broken down a lot for effect, possibly more than would be immediately useful

const validateState = (oldState: UserState) => (newState: UserState): UserState =>
  UserStateValidator.decode(newState).getOrElse(oldState);

// note this function may return a broken UserState - this is to demonstrate the validation
const setEditUserAge = (ageString: string) => (state: UserState): UserState => ({
  ...state,
  editUser: {
    ...state.editUser,
    age: Number(ageString) || (ageString as any)
  }
});

const setEditUserFirstName = (firstName: string) => (state: UserState): UserState => ({
  ...state,
  editUser: {
    ...state.editUser,
    firstName
  }
});

const setEditUserLastName = (lastName: string) => (state: UserState): UserState => ({
  ...state,
  editUser: {
    ...state.editUser,
    lastName
  }
});

const addEditUserToList = (state: UserState): UserState => ({
  ...state,
  users: state.users.concat([
    {
      ...state.editUser,
      userID: state.nextUserID
    }
  ])
});

const incrementNextUserID = (state: UserState): UserState => ({
  ...state,
  nextUserID: state.nextUserID + 1
});

const removeUserFromList = (userID: number) => (state: UserState): UserState => ({
  ...state,
  users: state.users.filter(user => user.userID !== userID)
});

const clearForm = (state: UserState): UserState => ({
  ...state,
  editUser: defaultUser
});

// actual reducer actions, built from the bits above composed together

const setAge = (ageString: string) => (state: UserState): UserState =>
  compose([setEditUserAge(ageString), validateState(state)])(state);

const setFirstName = (firstName: string) => (state: UserState): UserState =>
  compose([setEditUserFirstName(firstName), validateState(state)])(state);

const setLastName = (lastName: string) => (state: UserState): UserState =>
  compose([setEditUserLastName(lastName), validateState(state)])(state);

const addUser = () => (state: UserState): UserState =>
  compose([addEditUserToList, clearForm, incrementNextUserID, validateState(state)])(state);

const removeUser = (userID: number) => (state: UserState): UserState =>
  compose([removeUserFromList(userID), validateState(state)])(state);

// the reducer itself, with the functions passed in

const { reducer, wrap } = createAtomic("UserAdvanced", advancedInitialState, [
  addUser,
  removeUser,
  setAge,
  setFirstName,
  setLastName
]);

// reducer exported for combining elsewhere
export const userAdvancedReducer = reducer;

// actions created and exported for use elsewhere
export const actions = {
  onAddUser: wrap(addUser),
  onRemoveUser: wrap(removeUser),
  onSetAge: wrap(setAge),
  onSetFirstName: wrap(setFirstName),
  onSetLastName: wrap(setLastName)
};
