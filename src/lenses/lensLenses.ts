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
export const lenses = {
  lensState: lensStateL,
  editPerson: editPersonL,
  editPersonAge: editPersonL.compose(ageL),
  editPersonFirstName: editPersonL.compose(firstNameL),
  editPersonLastName: editPersonL.compose(lastNameL),
  people: peopleL,
  warning: warningL
};
