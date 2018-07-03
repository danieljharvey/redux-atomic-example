import * as React from "react";
import { connect } from "react-redux";
import { actions } from "./lensReducer";
import { LensPerson } from "./lensTypes";
import { IStoreState } from "../Store";

interface IUserListStateProps {
  people: LensPerson[];
}

interface IUserListDispatchProps {
  onRemovePerson: (personID: number) => void;
}

type IUserListProps = IUserListStateProps & IUserListDispatchProps;

const removePerson = (props: IUserListProps, personID: number) => () => props.onRemovePerson(personID);

const LensList = (props: IUserListProps) => {
  return (
    <div>
      {props.people.map((person: LensPerson, index: number) => (
        <div key={index}>
          <h3>{person.firstName + " " + person.lastName}</h3>
          <button onClick={removePerson(props, person.personID)}>delete</button>
        </div>
      ))
      }
    </div>
  );
};

const mapDispatchToProps: IUserListDispatchProps = {
  onRemovePerson: actions.removePerson
};

const mapStateToProps = (state: IStoreState): IUserListStateProps => {
  return {
    people: state.lens.people
  };
};

export const LensListContainer = connect<IUserListStateProps, IUserListDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(LensList);
