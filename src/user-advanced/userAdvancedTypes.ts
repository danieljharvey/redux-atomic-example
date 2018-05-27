import * as t from "io-ts";

// validator for user
export const UserValidator = t.type({
  age: t.number,
  firstName: t.string,
  lastName: t.string,
  userID: t.number
});

// validator for whole reducer
export const UserStateValidator = t.type({
  editUser: UserValidator,
  nextUserID: t.number,
  users: t.array(UserValidator)
});

// types generated from validators
export type User = t.TypeOf<typeof UserValidator>;
export type UserState = t.TypeOf<typeof UserStateValidator>;
