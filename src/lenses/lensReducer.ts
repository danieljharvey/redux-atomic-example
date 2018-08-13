import { createAtomic, AtomicAction } from "redux-atomic";
import { LensPerson, LensState, fetchData, FetchData } from "./lensTypes";
import { reducers, lenses, dataL } from "./lensLenses";
import { compose } from "ramda";
import { Lens } from "monocle-ts";
import { Loop, loop, Cmd } from "redux-loop";

import { validateOrWarning } from "./lensValidation";

// setting initialState
const defaultUser: LensPerson = {
  firstName: "",
  lastName: "",
  age: 0
};

export const initialState: LensState = {
  editPerson: defaultUser,
  people: [],
  warning: "Fucking hell lads",
  data: fetchData.empty()
};

const addUser = () => (state: LensState): LensState =>
  compose(
    validateOrWarning(state),
    reducers.setEditPerson(defaultUser),
    lenses.people.modify(people => people.concat(state.editPerson))
  )(state);

const removePerson = (id: number) => (state: LensState): LensState =>
  compose(
    validateOrWarning(state),
    lenses.people.modify(people =>
      people.filter((_, index: number) => id !== index)
    )
  )(state);

const setFirstName = (firstName: string) => (state: LensState): LensState =>
  compose(
    validateOrWarning(state),
    reducers.setFirstName(firstName)
  )(state);

const setLastName = (lastName: string) => (state: LensState): LensState =>
  compose(
    validateOrWarning(state),
    reducers.setLastName(lastName)
  )(state);

const { wrap } = createAtomic("LensPerson", initialState, {});

const fetchSuccess = <A, S>(lens: Lens<S, FetchData<A>>) => (data: A) => (
  state: S
): S => lens.set(fetchData.ready(data))(state);

const fetchFailed = <A, S>(lens: Lens<S, FetchData<A>>) => () => (
  state: S
): S => lens.set(fetchData.failed())(state);

const startFetch = <A, S>(
  lens: Lens<S, FetchData<A>>,
  success: (a: A) => AtomicAction<S, S>,
  fail: () => AtomicAction<S, S>
) => () => (state: S): Loop<S, AtomicAction<S, S>> =>
  loop<S, AtomicAction<S, S>>(
    lens.set(fetchData.loading())(state),
    Cmd.run(func, {
      successActionCreator: success,
      failActionCreator: fail
    })
  );

const dataLad = () => {
  return Promise.resolve("horses");
};

const { actionTypes, reducer } = createAtomic<LensState, LensState>(
  "LensPerson",
  initialState,
  {
    addUser,
    setFirstName,
    setLastName,
    removePerson
  }
);

export const lensReducer = reducer;

export const lensActionTypes = actionTypes;

export const actions = {
  addUser: wrap(addUser, "addUser"),
  setFirstName: wrap(reducers.setFirstName, "setFirstName"),
  setLastName: wrap(reducers.setLastName, "setLastName"),
  removePerson: wrap(removePerson, "removePerson")
};
