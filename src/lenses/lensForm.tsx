import * as React from "react";
import { connect } from "react-redux";
import { actions } from "./lensReducer";
import { IStoreState } from "../Store";
import { selectors } from './lensLenses'

interface IUserFormStateProps {
  age: number
  firstName: string
  lastName: string
  personID: number
}

interface IUserFormDispatchProps {
  onAddUser: () => void;
  onSetFirstName: (firstName: string) => void;
  onSetLastName: (firstName: string) => void;
}

type IUserFormProps = IUserFormStateProps & IUserFormDispatchProps;

const setFirstName = (props: IUserFormProps) => (evt: React.ChangeEvent<HTMLInputElement>) =>
  props.onSetFirstName(evt.target.value.toString());

const setLastName = (props: IUserFormProps) => (evt: React.ChangeEvent<HTMLInputElement>) =>
  props.onSetLastName(evt.target.value.toString());

const LensForm = (props: IUserFormProps) => {
  return (
    <div>
      <label>First name</label>
      <input type="text" name="firstName" value={props.firstName} onChange={setFirstName(props)} />
      <label>Last name</label>
      <input type="text" name="lastName" value={props.lastName} onChange={setLastName(props)} />
      <button onClick={props.onAddUser}>Save</button>
    </div>
  );
};

const mapDispatchToProps: IUserFormDispatchProps = {
  onAddUser: actions.addUser,
  onSetFirstName: (firstName: string) => actions.setFirstName(firstName),
  onSetLastName: actions.setLastName
};

const mapStateToProps = (state: IStoreState): IUserFormStateProps => ({
  age: selectors.editPerson.age(state),
  firstName: selectors.editPerson.firstName(state),
  lastName: selectors.editPerson.lastName(state),
  personID: selectors.editPerson.personID(state)
})

export const LensFormContainer = connect<IUserFormStateProps, IUserFormDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(LensForm);
