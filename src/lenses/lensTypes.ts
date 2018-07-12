import * as t from "io-ts";

// validator for user
export const LensPersonValidator = t.type({
  age: t.number,
  firstName: t.string,
  lastName: t.string
});

// validator for whole reducer
export const LensStateValidator = t.type({
  editPerson: LensPersonValidator,
  people: t.array(LensPersonValidator)
});

// types generated from validators
export type LensPerson = t.TypeOf<typeof LensPersonValidator>;
export type LensState = t.TypeOf<typeof LensStateValidator>;
