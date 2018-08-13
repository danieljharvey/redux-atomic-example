import * as t from "io-ts";

// validator for user
export const LensPersonValidaror = t.type({
  age: t.number,
  firstName: t.string,
  lastName: t.string
});

const enum state {
  Empty = "EMPTY",
  Loading = "LOADING",
  Ready = "READY",
  Failed = "FAILED"
}

const UserValidator = t.type({
  login: t.string,
  id: t.number,
  node_id: t.string,
  url: t.string,
  public_repos: t.number,
  public_gists: t.number
});

export const DataValidator = (validator: t.Type<any>) =>
  t.type({
    data: t.union([t.null, validator]),
    state: t.union([
      t.literal(state.Empty),
      t.literal(state.Loading),
      t.literal(state.Ready),
      t.literal(state.Failed)
    ])
  });

const UserData = DataValidator(UserValidator);

// validator for whole reducer
export const LensStateValidator = t.type({
  editPerson: LensPersonValidaror,
  people: t.array(LensPersonValidaror),
  warning: t.string,
  data: UserData
});

// types generated from validators
export type LensPerson = t.TypeOf<typeof LensPersonValidaror>;
export type LensState = t.TypeOf<typeof LensStateValidator>;

export type UserType = t.TypeOf<typeof UserValidator>;
export type UserDataType = t.TypeOf<typeof UserData>;

export interface FetchData<A> {
  data: A | null;
  state: state;
}

const empty = <A>(): FetchData<A> => ({
  data: null,
  state: state.Empty
});

const loading = <A>(): FetchData<A> => ({
  data: null,
  state: state.Loading
});

const ready = <A>(data: A): FetchData<A> => ({
  data,
  state: state.Ready
});

const failed = <A>(): FetchData<A> => ({
  data: null,
  state: state.Failed
});

export const fetchData = {
  empty,
  loading,
  ready,
  failed
};
