import * as React from "react";
import { connect } from "react-redux";
import { actions } from "./lensReducer";
import { IStoreState } from "../Store";
import { selectors } from "./LensSelectors";

interface IUserFormStateProps {
  age: number;
  firstName: string;
  lastName: string;
  warning: string;
}

interface IUserFormDispatchProps {
  onAddUser: () => void;
  onSetFirstName: (firstName: string) => void;
  onSetLastName: (firstName: string) => void;
}

type IUserFormProps = IUserFormStateProps & IUserFormDispatchProps;

const setFirstName = (props: IUserFormProps) => (
  evt: React.ChangeEvent<HTMLInputElement>
) => props.onSetFirstName(evt.target.value.toString());

const setLastName = (props: IUserFormProps) => (
  evt: React.ChangeEvent<HTMLInputElement>
) => props.onSetLastName(evt.target.value.toString());

const LensForm = (props: IUserFormProps) => {
  const emptyArray: any = [];
  return (
    <div>
      {props.warning.length > 0 && (
        <div className="warningBox">
          <p>{props.warning}</p>
        </div>
      )}
      <label>First name</label>
      <input
        type="text"
        name="firstName"
        value={props.firstName}
        onChange={setFirstName(props)}
      />
      <label>Last name</label>
      <input
        type="text"
        name="lastName"
        value={props.lastName}
        onChange={setLastName(props)}
      />
      <button onClick={props.onAddUser}>Save</button>
      <button onClick={() => props.onSetFirstName(emptyArray)}>
        Set first name to []
      </button>
    </div>
  );
};

const mapDispatchToProps: IUserFormDispatchProps = {
  onAddUser: actions.addUser,
  onSetFirstName: (firstName: string) => actions.setFirstName(firstName),
  onSetLastName: actions.setLastName
};

const mapStateToProps = (state: IStoreState): IUserFormStateProps => ({
  age: selectors.editPersonAge(state),
  firstName: selectors.editPersonFirstName(state),
  lastName: selectors.editPersonLastName(state),
  warning: selectors.warning(state)
});

export const LensFormContainer = connect<
  IUserFormStateProps,
  IUserFormDispatchProps
>(
  mapStateToProps,
  mapDispatchToProps
)(LensForm);
