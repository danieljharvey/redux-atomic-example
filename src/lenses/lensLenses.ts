import { LensPerson, LensState } from "./lensTypes";
import { Lens } from "monocle-ts";

import { IStoreState } from "../Store";

// Store -> LensState
const lensStateL = Lens.fromProp<IStoreState, "lens">("lens");

// LensState -> LensState['people']
const peopleL = Lens.fromProp<LensState, "people">("people");

// LensState -> LensState['warning']
const warningL = Lens.fromProp<LensState, "warning">("warning");

// LensState -> LensState['editPerson']
const editPersonL = Lens.fromProp<LensState, "editPerson">("editPerson");

// LensPerson -> LensPerson['age']
const ageL = Lens.fromProp<LensPerson, "age">("age");

// LensPerson -> LensPerson['firstName']
const firstNameL = Lens.fromProp<LensPerson, "firstName">("firstName");

// LensPerson -> LensPerson['lastName']
const lastNameL = Lens.fromProp<LensPerson, "lastName">("lastName");

// state -> state
export const selectors = {
  editPerson: {
    age: lensStateL.compose(editPersonL).compose(ageL).get,
    firstName: lensStateL.compose(editPersonL).compose(firstNameL).get,
    lastName: lensStateL.compose(editPersonL).compose(lastNameL).get
  },
  people: lensStateL.compose(peopleL).get,
  warning: lensStateL.compose(warningL).get
};

// LensState -> LensState
export const reducers = {
  setFirstName: editPersonL.compose(firstNameL).set,
  setLastName: editPersonL.compose(lastNameL).set,
  setEditPerson: editPersonL.set,
  setWarning: warningL.set
};

export const lenses = {
  people: peopleL
};
