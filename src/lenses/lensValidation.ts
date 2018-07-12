import { LensState, LensStateValidator } from "./lensTypes";
import { ValidationError } from "io-ts";
import { Either, right, left } from "fp-ts/lib/Either";
import { lenses } from "./lensLenses";

const isLongEnough = (str: string): boolean => str.length > 0;

const firstNameLongEnough = (state: LensState): Either<string, LensState> =>
  isLongEnough(lenses.editPersonFirstName.get(state))
    ? right(state)
    : left("First name is too short");

const lastNameLongEnough = (state: LensState): Either<string, LensState> =>
  isLongEnough(lenses.editPersonLastName.get(state))
    ? right(state)
    : left("Last name is too short");

export const validateOrWarning = (
  state: LensState
): Either<string, LensState> =>
  LensStateValidator.decode(state)
    .mapLeft(errorsToWarning)
    .chain(firstNameLongEnough)
    .chain(lastNameLongEnough);

const errorsToWarning = (errors: ValidationError[]): string =>
  errors.map(showValidationError).join("\n");

const type: any = { name: "unknown" };
const mempty: ValidationError["context"] = [
  {
    key: "poo",
    type
  }
];
const last = <A>(_: A, val: A): A => val;

const showValidationError = (error: ValidationError): string => {
  const errored = error.context.reduce(last, mempty[0]);
  return `Error in ${errored.key} - value does not match type of ${
    errored.type.name
  }`;
};
