import { createAtomic } from "redux-atomic";
import { compose } from "ramda";
import { Person, PersonState, PersonStateValidator } from "./validatedTypes";
import { Either } from "fp-ts/lib/Either";

// This reducer is probably going to get silly
// passing either type around so that we can surface validation messages

// default state
const defaultPerson: Person = {
  age: 0,
  firstName: "",
  lastName: "",
  personID: 0
};

const advancedInitialState: PersonState = {
  editPerson: defaultPerson,
  nextPersonID: 1,
  people: [],
  warning: ""
};

// partial helper functions
// these are broken down a lot for effect, possibly more than would be immediately useful

const validateState = (newState: PersonState): Either<any, PersonState> =>
  PersonStateValidator.decode(newState);

const getOrElse = (oldState: PersonState) => (eitherState: Either<any, PersonState>): PersonState =>
  eitherState.getOrElse(oldState);

// note this function may return a broken PersonState - this is to demonstrate the validation
const setEditPersonAge = (ageString: string) => (state: PersonState): PersonState => ({
  ...state,
  editPerson: {
    ...state.editPerson,
    age: Number(ageString) || (ageString as any)
  }
});

const setEditPersonFirstName = (firstName: string) => (state: PersonState): PersonState => ({
  ...state,
  editPerson: {
    ...state.editPerson,
    firstName
  }
});

const setEditPersonLastName = (lastName: string) => (state: PersonState): PersonState => ({
  ...state,
  editPerson: {
    ...state.editPerson,
    lastName
  }
});

const addEditPersonToList = (state: PersonState): PersonState => ({
  ...state,
  people: state.people.concat([
    {
      ...state.editPerson,
      personID: state.nextPersonID
    }
  ])
});

const incrementNextPersonID = (state: PersonState): PersonState => ({
  ...state,
  nextPersonID: state.nextPersonID + 1
});

const removePersonFromList = (personID: number) => (state: PersonState): PersonState => ({
  ...state,
  people: state.people.filter(person => person.personID !== personID)
});

const clearForm = (state: PersonState): PersonState => ({
  ...state,
  editPerson: defaultPerson
});

const resetWarning = (state: PersonState): PersonState => ({ ...state, warning: "" });

// actual reducer actions, built from the bits above composed together

const setAge = (ageString: string) => (state: PersonState): PersonState =>
  compose(getOrElse(state), validateState, resetWarning, setEditPersonAge(ageString))(state);

const setFirstName = (firstName: string) => (state: PersonState): PersonState =>
  compose(getOrElse(state), validateState, resetWarning, setEditPersonFirstName(firstName))(state);

const setLastName = (lastName: string) => (state: PersonState): PersonState =>
  compose(getOrElse(state), validateState, resetWarning, setEditPersonLastName(lastName))(state);

const addUser = () => (state: PersonState): PersonState =>
  compose(
    getOrElse(state),
    validateState,
    resetWarning,
    incrementNextPersonID,
    clearForm,
    addEditPersonToList
  )(state);

const removeUser = (userID: number) => (state: PersonState): PersonState =>
  compose(getOrElse(state), validateState, resetWarning, removePersonFromList(userID))(state);

// the reducer itself, with the functions passed in

const { reducer, wrap } = createAtomic("Validated", advancedInitialState, [
  addUser,
  removeUser,
  setAge,
  setFirstName,
  setLastName
]);

// reducer exported for combining elsewhere
export const validatedReducer = reducer;

// actions created and exported for use elsewhere
export const actions = {
  onAddUser: wrap(addUser),
  onRemoveUser: wrap(removeUser),
  onSetAge: wrap(setAge),
  onSetFirstName: wrap(setFirstName),
  onSetLastName: wrap(setLastName)
};
