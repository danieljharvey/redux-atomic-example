import { createAtomic } from "redux-atomic";
import { LensPerson, LensState } from "./lensTypes";
import { reducers, lenses } from './lensLenses'

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


const addUser = () => (state: LensState): LensState => ({
  ...state,
  editPerson: defaultUser,
  people: state.people.concat(state.editPerson)
})

const removePerson = (personID: number) => lenses.people.modify(people => people.filter(removePersonFilter(personID)))

const removePersonFilter = (personID: number) => (person: LensPerson) => person.personID !== personID

const { actionTypes, reducer, wrap } = createAtomic<LensState, LensState>("LensPerson", initialState, { addUser, setFirstName: reducers.setFirstName, setLastName: reducers.setLastName, removePerson });

export const lensReducer = reducer;

export const lensActionTypes = actionTypes

export const actions = {
  addUser: wrap(addUser, 'addUser'),
  setFirstName: wrap(reducers.setFirstName, 'setFirstName'),
  setLastName: wrap(reducers.setLastName, 'setLastName'),
  removePerson: wrap(removePerson, 'removePerson')
};
