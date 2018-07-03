import { createAtomic, AtomicAction } from "redux-atomic";
import { compose } from "ramda";
import { Person, PersonState, PersonStateValidator } from "./validatedTypes";
import { Either } from "fp-ts/lib/Either";
import { lensAction } from '../utils/lens'
import { getRecipientsCount } from '../user/userSelectors'
import { loop, Loop } from 'redux-loop'

// This reducer is probably going to get silly
// passing either type around so that we can surface validation messages

// default state
const defaultPerson: Person = {
  age: 0,
  firstName: "",
  lastName: "",
  personID: 0
};

export const initialState: PersonState = {
  editPerson: defaultPerson,
  nextPersonID: 1,
  people: [],
  warning: "",
  firstUserCount: 0
};

type LoopState = Loop<PersonState, AtomicAction<PersonState, PersonState>>

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
})

const fetchCount = (state: PersonState): LoopState => loop<PersonState, AtomicAction<PersonState, PersonState>>(state,
  lensAction(getRecipientsCount, actions.onUpdateCount))

const updateCount = (num: number) => (state: PersonState): PersonState => {
  return {
    ...state,
    firstUserCount: num + state.people.length
  }
}

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

const addUser = () => (state: PersonState): LoopState =>
  compose(
    fetchCount,
    getOrElse(state),
    validateState,
    incrementNextPersonID,
    clearForm,
    addEditPersonToList
  )(state);

const removeUser = (userID: number) => (state: PersonState): PersonState =>
  compose(getOrElse(state), validateState, resetWarning, removePersonFromList(userID))(state);

// the reducer itself, with the functions passed in

const { actionTypes, reducer, wrap } = createAtomic<PersonState, PersonState | LoopState>("Validated", initialState, { addUser, removeUser, setAge, setFirstName, setLastName, updateCount })

// reducer exported for combining elsewhere
export const validatedReducer = reducer;

export const validatedActionTypes = actionTypes

// actions created and exported for use elsewhere
export const actions = {
  onAddUser: wrap(addUser, 'addUser'),
  onRemoveUser: wrap(removeUser, 'removeUser'),
  onSetAge: wrap(setAge, 'setAge'),
  onSetFirstName: wrap(setFirstName, 'setFirstName'),
  onSetLastName: wrap(setLastName, 'setLastName'),
  onUpdateCount: wrap(updateCount, 'updateCount')
};
