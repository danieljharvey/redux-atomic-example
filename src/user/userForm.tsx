import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { actions, IUser } from "./userReducer";

import { IStoreState } from "../Store";

interface IUserFormStateProps {
  editUser: IUser;
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

const UserForm = (props: IUserFormProps) => {
  return (
    <div>
      <label>First name</label>
      <input type="text" name="firstName" value={props.editUser.firstName} onChange={setFirstName(props)} />
      <label>Last name</label>
      <input type="text" name="lastName" value={props.editUser.lastName} onChange={setLastName(props)} />
      <button onClick={props.onAddUser}>Save</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): IUserFormDispatchProps => ({
  onAddUser: () => dispatch(actions.onAddUser()),
  onSetFirstName: firstName => dispatch(actions.onSetFirstName(firstName)),
  onSetLastName: lastName => dispatch(actions.onSetLastName(lastName))
});

const mapStateToProps = (state: IStoreState): IUserFormStateProps => ({
  editUser: state.user.editUser
});

export const UserFormContainer = connect<IUserFormStateProps, IUserFormDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
