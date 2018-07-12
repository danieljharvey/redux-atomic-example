import { lensReducer, initialState, actions } from "./lensReducer";
import { LensPerson, LensState } from "./lensTypes";

describe("Lens reducer", () => {
  it("Adds a user to the list", () => {
    const state = {
      ...initialState,
      editPerson: {
        ...initialState.editPerson,
        firstName: "Horse",
        lastName: "Time"
      }
    };
    const newState = lensReducer(state, actions.addUser());
    expect(newState.people).toHaveLength(1);
    expect(newState.people[0].firstName).toEqual("Horse");
  });

  it("Changes the firstName of the edited person", () => {
    const state = {
      ...initialState,
      editPerson: {
        ...initialState.editPerson,
        firstName: "",
        lastName: "Time"
      }
    };
    const newState = lensReducer(state, actions.setFirstName("Dog"));
    expect(newState.editPerson.firstName).toEqual("Dog");
  });

  it("Changes the lastName of the edited person", () => {
    const state = {
      ...initialState,
      editPerson: {
        ...initialState.editPerson,
        firstName: "Yeah",
        lastName: ""
      }
    };
    const newState = lensReducer(state, actions.setLastName("Detroit"));
    expect(newState.editPerson.lastName).toEqual("Detroit");
  });

  it("Removes a person from the list", () => {
    const defaultPerson: LensPerson = {
      firstName: "Steve",
      lastName: "Danger",
      age: 100
    };
    const state: LensState = {
      ...initialState,
      people: [
        {
          ...defaultPerson,
          firstName: "huey"
        },
        {
          ...defaultPerson,
          firstName: "dewey"
        },
        {
          ...defaultPerson,
          firstName: "louie"
        }
      ]
    };
    const newState = lensReducer(state, actions.removePerson(1));
    expect(newState.people.map(person => person.firstName)).toEqual([
      "huey",
      "louie"
    ]);
  });
});
