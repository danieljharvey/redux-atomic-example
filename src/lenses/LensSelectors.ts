import { lenses } from "./lensLenses";

export const selectors = {
  lensState: lenses.lensState.get,
  editPerson: lenses.lensState.compose(lenses.editPerson).get,
  editPersonAge: lenses.lensState.compose(lenses.editPersonAge).get,
  editPersonFirstName: lenses.lensState.compose(lenses.editPersonFirstName).get,
  editPersonLastName: lenses.lensState.compose(lenses.editPersonLastName).get,
  people: lenses.lensState.compose(lenses.people).get,
  warning: lenses.lensState.compose(lenses.warning).get
};
