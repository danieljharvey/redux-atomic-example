import * as React from "react";
import { connect } from "react-redux";
import { actions } from "./validatedReducer";
import { Person } from "./validatedTypes";
import { IStoreState } from "../Store";

interface IUserFormStateProps {
  editPerson: Person;
  warning: string;
  firstUserCount: number
}

interface IUserFormDispatchProps {
  onAddUser: () => void;
  onSetFirstName: (firstName: string) => void;
  onSetLastName: (firstName: string) => void;
  onSetAge: (ageString: string) => void;
}

type IUserFormProps = IUserFormStateProps & IUserFormDispatchProps;

const setFirstName = (props: IUserFormProps) => (evt: React.ChangeEvent<HTMLInputElement>) =>
  props.onSetFirstName(evt.target.value.toString());

const setLastName = (props: IUserFormProps) => (evt: React.ChangeEvent<HTMLInputElement>) =>
  props.onSetLastName(evt.target.value.toString());

const setAge = (props: IUserFormProps) => (evt: React.ChangeEvent<HTMLInputElement>) =>
  props.onSetAge(evt.target.value);

const ValidatedForm = (props: IUserFormProps) => {
  return (
    <div>
      {props.warning && <h1 style={{ color: "red" }}>{props.warning}</h1>}
      <p>Reducer one has {props.firstUserCount.toString()} members</p>
      <label>First name</label>
      <input
        type="text"
        name="advancedFirstName"
        value={props.editPerson.firstName}
        onChange={setFirstName(props)}
      />
      <label>Last name</label>
      <input
        type="text"
        name="advancedLastName"
        value={props.editPerson.lastName}
        onChange={setLastName(props)}
      />
      <label>Age</label>
      <input
        type="text"
        name="advancedAge"
        value={props.editPerson.age.toString()}
        onChange={setAge(props)}
      />
      <button onClick={props.onAddUser}>Save</button>
    </div>
  );
};

const mapDispatchToProps: IUserFormDispatchProps = {
  onAddUser: actions.onAddUser,
  onSetAge: actions.onSetAge,
  onSetFirstName: actions.onSetFirstName,
  onSetLastName: actions.onSetLastName
};

const mapStateToProps = (state: IStoreState): IUserFormStateProps => ({
  editPerson: state.validated.editPerson,
  warning: state.validated.warning,
  firstUserCount: state.validated.firstUserCount
});

export const ValidatedFormContainer = connect<IUserFormStateProps, IUserFormDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ValidatedForm);
