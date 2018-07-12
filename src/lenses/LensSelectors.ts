import { lenses } from "./lensLenses";
import { IStoreState } from "../Store";
import { validateOrWarning } from "./lensValidation";

type Selector<T> = { [key: string]: (state: T) => any };

export const selectors: Selector<IStoreState> = {
  lensState: lenses.lensState.get,
  editPerson: lenses.lensState.compose(lenses.editPerson).get,
  editPersonAge: lenses.lensState.compose(lenses.editPersonAge).get,
  editPersonFirstName: lenses.lensState.compose(lenses.editPersonFirstName).get,
  editPersonLastName: lenses.lensState.compose(lenses.editPersonLastName).get,
  people: lenses.lensState.compose(lenses.people).get,
  valid: state => validateOrWarning(lenses.lensState.get(state)).isRight(),
  warning: state =>
    validateOrWarning(lenses.lensState.get(state))
      .swap()
      .getOrElse("")
};
