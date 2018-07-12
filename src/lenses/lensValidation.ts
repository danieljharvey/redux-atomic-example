import { lenses } from "./lensLenses";

import { LensState, LensStateValidator } from "./lensTypes";
import { ValidationError } from "io-ts";

export const validateOrWarning = (oldState: LensState) => (
  state: LensState
): LensState =>
  LensStateValidator.decode(state)
    .map(lenses.warning.set(""))
    .getOrElseL(errorsToWarning(oldState));

const errorsToWarning = (oldState: LensState) => (
  errors: ValidationError[]
): LensState =>
  lenses.warning.set(errors.map(showValidationError).join("\n"))(oldState);

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
