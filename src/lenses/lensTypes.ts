import * as t from "io-ts";

// validator for user
export const LensPersonValidaror = t.type({
  age: t.number,
  firstName: t.string,
  lastName: t.string,
  personID: t.number
});

// validator for whole reducer
export const LensStateValidator = t.type({
  editPerson: LensPersonValidaror,
  nextPersonID: t.number,
  people: t.array(LensPersonValidaror),
  warning: t.string,
  firstUserCount: t.number
});

// types generated from validators
export type LensPerson = t.TypeOf<typeof LensPersonValidaror>;
export type LensState = t.TypeOf<typeof LensStateValidator>;
