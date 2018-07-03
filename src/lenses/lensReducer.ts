import { createAtomic } from "redux-atomic";
import { LensPerson, LensState } from "./lensTypes";

// this is an entire Redux Atomic reducer
// actions and reducer and combined together

// setting initialState
const defaultUser: LensPerson = {
  firstName: "",
  lastName: "",
  personID: 0,
  age: 0
};

export const initialState: LensState = {
  editPerson: defaultUser,
  nextPersonID: 1,
  people: [],
  warning: "",
  firstUserCount: 0
};

const doNothing = () => (state: LensState): LensState => state

const addUser = () => (state: LensState): LensState => ({
  ...state,
  editPerson: defaultUser,
  people: state.people.concat(state.editPerson)
})

const setFirstName = (firstName: string) => (state: LensState): LensState => ({
  ...state,
  editPerson: {
    ...state.editPerson,
    firstName
  }
})

const setLastName = (lastName: string) => (state: LensState): LensState => ({
  ...state,
  editPerson: {
    ...state.editPerson,
    lastName
  }
})

const removePerson = (personID: number) => (state: LensState): LensState => ({
  ...state,
  people: state.people.filter(person => person.personID !== personID)
});


// this creates the reducer, it takes:
// - a name (must be unique
// - the initial state
// - an array of reducer action functions (from above)

const { actionTypes, reducer, wrap } = createAtomic<LensState, LensState>("LensPerson", initialState, { doNothing, addUser, setFirstName, setLastName, removePerson });

// it returns two things:
// - the reducer for exporting and combining etc
// - a wrap function for creating actions from your reducer actions

export const lensReducer = reducer;

export const lensActionTypes = actionTypes

// these actions can now be dispatched as normal
export const actions = {
  doNothing: wrap(doNothing, 'doNothing'),
  addUser: wrap(addUser, 'addUser'),
  setFirstName: wrap(setFirstName, 'setFirstName'),
  setLastName: wrap(setLastName, 'setLastName'),
  removePerson: wrap(removePerson, 'removePerson')
};
