export interface IUserState {
  users: IUser[];
  nextUserID: number;
  editUser: IUser;
}

export interface IUser {
  userID: number;
  firstName: string;
  lastName: string;
  dateOfBirth: Date | null;
}
