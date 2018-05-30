import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { actions } from "./validatedReducer";
import { Person } from "./validatedTypes";
import { IStoreState } from "../Store";

interface IUserListStateProps {
  people: Person[];
}

interface IUserListDispatchProps {
  onRemoveUser: (userID: number) => void;
}

type IUserListProps = IUserListStateProps & IUserListDispatchProps;

const removeUser = (props: IUserListProps, userID: number) => () => props.onRemoveUser(userID);

const ValidatedList = (props: IUserListProps) => {
  return (
    <div>
      {props.people.map((person, index) => (
        <div key={index}>
          <h3>{person.firstName + " " + person.lastName}</h3>
          <h4>{"Age " + person.age.toString()}</h4>
          <button onClick={removeUser(props, person.personID)}>delete</button>
        </div>
      ))
      }
    </div >
  );
};

const mapDispatchToProps = (dispatch: Dispatch): IUserListDispatchProps => ({
  onRemoveUser: (userID: number) => dispatch(actions.onRemoveUser(userID))
});

const mapStateToProps = (state: IStoreState): IUserListStateProps => {
  return {
    people: state.validated.people
  };
};

export const ValidatedListContainer = connect<IUserListStateProps, IUserListDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ValidatedList);
