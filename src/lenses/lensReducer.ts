import { createAtomic } from "redux-atomic";
import { LensPerson, LensState } from "./lensTypes";
import { lenses } from "./lensLenses";
import { compose } from "ramda";

// setting initialState
const defaultUser: LensPerson = {
  firstName: "",
  lastName: "",
  age: 0
};

export const initialState: LensState = {
  editPerson: defaultUser,
  people: [],
  warning: "Fucking hell lads"
};

const addUser = () => (state: LensState): LensState =>
  compose(
    lenses.editPerson.set(defaultUser),
    lenses.people.modify(people => people.concat(state.editPerson))
  )(state);

const removePerson = (id: number) => (state: LensState): LensState =>
  lenses.people.modify(people =>
    people.filter((_, index: number) => id !== index)
  )(state);

const { actionTypes, reducer, wrap } = createAtomic<LensState, LensState>(
  "LensPerson",
  initialState,
  {
    addUser,
    setFirstName: lenses.editPersonFirstName.set,
    setLastName: lenses.editPersonLastName.set,
    removePerson
  }
);

export const lensReducer = reducer;

export const lensActionTypes = actionTypes;

export const actions = {
  addUser: wrap(addUser, "addUser"),
  setFirstName: wrap(lenses.editPersonFirstName.set, "setFirstName"),
  setLastName: wrap(lenses.editPersonLastName.set, "setLastName"),
  removePerson: wrap(removePerson, "removePerson")
};
