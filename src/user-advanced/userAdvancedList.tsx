import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { actions, User } from "./userAdvancedReducer";

import { IStoreState } from "../Store";

interface IUserListStateProps {
  users: User[];
}

interface IUserListDispatchProps {
  onRemoveUser: (userID: number) => void;
}

type IUserListProps = IUserListStateProps & IUserListDispatchProps;

const removeUser = (props: IUserListProps, userID: number) => () => props.onRemoveUser(userID);
const UserAdvancedList = (props: IUserListProps) => {
  return (
    <div>
      {props.users.map(user => (
        <div>
          <h3>{user.firstName + " " + user.lastName}</h3>
          <h4>{"Age " + user.age.toString()}</h4>
          <button onClick={removeUser(props, user.userID)}>delete</button>
        </div>
      ))}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): IUserListDispatchProps => ({
  onRemoveUser: (userID: number) => dispatch(actions.onRemoveUser(userID))
});

const mapStateToProps = (state: IStoreState): IUserListStateProps => {
  return {
    users: state.advancedUser.users
  };
};

export const UserAdvancedListContainer = connect<IUserListStateProps, IUserListDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserAdvancedList);
