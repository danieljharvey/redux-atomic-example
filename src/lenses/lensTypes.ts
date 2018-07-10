import * as t from "io-ts";

// validator for user
export const LensPersonValidaror = t.type({
  age: t.number,
  firstName: t.string,
  lastName: t.string
});

// validator for whole reducer
export const LensStateValidator = t.type({
  editPerson: LensPersonValidaror,
  people: t.array(LensPersonValidaror),
  warning: t.string
});

// types generated from validators
export type LensPerson = t.TypeOf<typeof LensPersonValidaror>;
export type LensState = t.TypeOf<typeof LensStateValidator>;
