import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { actions } from "./userAdvancedReducer";
import { User } from "./userAdvancedTypes";
import { IStoreState } from "../Store";

interface IUserFormStateProps {
  editUser: User;
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

const UserAdvancedForm = (props: IUserFormProps) => {
  return (
    <div>
      <label>First name</label>
      <input
        type="text"
        name="advancedFirstName"
        value={props.editUser.firstName}
        onChange={setFirstName(props)}
      />
      <label>Last name</label>
      <input
        type="text"
        name="advancedLastName"
        value={props.editUser.lastName}
        onChange={setLastName(props)}
      />
      <label>Age</label>
      <input type="text" name="advancedAge" value={props.editUser.age.toString()} onChange={setAge(props)} />
      <button onClick={props.onAddUser}>Save</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): IUserFormDispatchProps => ({
  onAddUser: () => dispatch(actions.onAddUser()),
  onSetAge: ageString => dispatch(actions.onSetAge(ageString)),
  onSetFirstName: firstName => dispatch(actions.onSetFirstName(firstName)),
  onSetLastName: lastName => dispatch(actions.onSetLastName(lastName))
});

const mapStateToProps = (state: IStoreState): IUserFormStateProps => ({
  editUser: state.advancedUser.editUser
});

export const UserAdvancedFormContainer = connect<IUserFormStateProps, IUserFormDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserAdvancedForm);
