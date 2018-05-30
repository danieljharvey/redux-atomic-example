import * as t from "io-ts";

// validator for user
export const PersonValidator = t.type({
  age: t.number,
  firstName: t.string,
  lastName: t.string,
  personID: t.number
});

// validator for whole reducer
export const PersonStateValidator = t.type({
  editPerson: PersonValidator,
  nextPersonID: t.number,
  people: t.array(PersonValidator),
  warning: t.string,
  firstUserCount: t.number
});

// types generated from validators
export type Person = t.TypeOf<typeof PersonValidator>;
export type PersonState = t.TypeOf<typeof PersonStateValidator>;
