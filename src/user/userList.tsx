import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { actions, IUser } from "./userReducer";

import { IStoreState } from "../Store";

interface IUserListStateProps {
  users: IUser[];
}

interface IUserListDispatchProps {
  onRemoveUser: (userID: number) => void;
}

type IUserListProps = IUserListStateProps & IUserListDispatchProps;

const removeUser = (props: IUserListProps, userID: number) => () => props.onRemoveUser(userID);
const UserList = (props: IUserListProps) => {
  return (
    <div>
      {props.users.map(user => (
        <div>
          <h3>{user.firstName + " " + user.lastName}</h3>
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
    users: state.user.users
  };
};

export const UserListContainer = connect<IUserListStateProps, IUserListDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(UserList);
