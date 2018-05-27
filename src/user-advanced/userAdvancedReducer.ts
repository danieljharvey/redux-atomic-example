import * as t from "io-ts";
import { createAtomic } from "redux-atomic";

const UserValidator = t.type({
  age: t.number,
  firstName: t.string,
  lastName: t.string,
  userID: t.number
});

const UserStateValidator = t.type({
  editUser: UserValidator,
  nextUserID: t.number,
  users: t.array(UserValidator)
});

export type User = t.TypeOf<typeof UserValidator>;
export type UserState = t.TypeOf<typeof UserStateValidator>;

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

const validateState = (oldState: UserState, newState: UserState): UserState =>
  UserStateValidator.decode(newState).getOrElse(oldState);

const setAge = (ageString: string) => (state: UserState): UserState =>
  validateState(state, {
    ...state,
    editUser: {
      ...state.editUser,
      age: Number(ageString) || ("problem" as any)
    }
  });

const setFirstName = (firstName: string) => (state: UserState): UserState =>
  validateState(state, {
    ...state,
    editUser: {
      ...state.editUser,
      firstName
    }
  });

const setLastName = (lastName: string) => (state: UserState): UserState =>
  validateState(state, {
    ...state,
    editUser: {
      ...state.editUser,
      lastName
    }
  });

const addUser = () => (state: UserState): UserState => {
  const user = {
    ...state.editUser,
    userID: state.nextUserID
  };
  return validateState(
    state,
    clearForm({
      ...state,
      users: state.users.concat([user])
    })
  );
};

const clearForm = (state: UserState): UserState =>
  validateState(state, {
    ...state,
    editUser: defaultUser,
    nextUserID: state.nextUserID + 1
  });

const removeUser = (userID: number) => (state: UserState): UserState =>
  validateState(state, {
    ...state,
    users: state.users.filter(user => user.userID !== userID)
  });

const { reducer, wrap } = createAtomic("UserAdvanced", advancedInitialState, [
  addUser,
  removeUser,
  setAge,
  setFirstName,
  setLastName
]);

export const userAdvancedReducer = reducer;

export const actions = {
  onAddUser: wrap(addUser),
  onRemoveUser: wrap(removeUser),
  onSetAge: wrap(setAge),
  onSetFirstName: wrap(setFirstName),
  onSetLastName: wrap(setLastName)
};
