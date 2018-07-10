import { createAtomic } from "redux-atomic";
import { LensPerson, LensState } from "./lensTypes";
import { reducers, lenses } from "./lensLenses";
import { compose } from "ramda";

import { validateOrWarning } from "./lensValidation";

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
    validateOrWarning(state),
    reducers.setEditPerson(defaultUser),
    lenses.people.modify(people => people.concat(state.editPerson))
  )(state);

const removePerson = (id: number) => (state: LensState): LensState =>
  compose(
    validateOrWarning(state),
    lenses.people.modify(people =>
      people.filter((_, index: number) => id !== index)
    )
  )(state);

const setFirstName = (firstName: string) => (state: LensState): LensState =>
  compose(
    validateOrWarning(state),
    reducers.setFirstName(firstName)
  )(state);

const setLastName = (lastName: string) => (state: LensState): LensState =>
  compose(
    validateOrWarning(state),
    reducers.setLastName(lastName)
  )(state);

const { actionTypes, reducer, wrap } = createAtomic<LensState, LensState>(
  "LensPerson",
  initialState,
  {
    addUser,
    setFirstName,
    setLastName,
    removePerson
  }
);

export const lensReducer = reducer;

export const lensActionTypes = actionTypes;

export const actions = {
  addUser: wrap(addUser, "addUser"),
  setFirstName: wrap(reducers.setFirstName, "setFirstName"),
  setLastName: wrap(reducers.setLastName, "setLastName"),
  removePerson: wrap(removePerson, "removePerson")
};
