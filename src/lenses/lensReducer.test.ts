import { lensReducer, initialState, actions } from './lensReducer'
import { LensPerson } from './lensTypes'

describe("Lens reducer", () => {
    it("Adds a user to the list", () => {
        const state = {
            ...initialState,
            editPerson: {
                ...initialState.editPerson,
                firstName: "Horse",
                lastName: "Time"
            }
        }
        const newState = lensReducer(state, actions.addUser())
        expect(newState.people).toHaveLength(1)
        expect(newState.people[0].firstName).toEqual('Horse')
    })

    it("Changes the firstName of the edited person", () => {
        const state = {
            ...initialState,
            editPerson: {
                ...initialState.editPerson,
                firstName: "",
                lastName: "Time"
            }
        }
        const newState = lensReducer(state, actions.setFirstName("Dog"))
        expect(newState.editPerson.firstName).toEqual('Dog')
    })

    it("Changes the lastName of the edited person", () => {
        const state = {
            ...initialState,
            editPerson: {
                ...initialState.editPerson,
                firstName: "Yeah",
                lastName: ""
            }
        }
        const newState = lensReducer(state, actions.setLastName("Detroit"))
        expect(newState.editPerson.lastName).toEqual('Detroit')
    })

    it("Removes a person from the list", () => {
        const defaultPerson: LensPerson = {
            personID: 1,
            firstName: "Steve",
            lastName: "Danger",
            age: 100
        }
        const state = {
            ...initialState,
            people: [
                {
                    ...defaultPerson,
                    personID: 1
                },
                {
                    ...defaultPerson,
                    personID: 2
                },
                {
                    ...defaultPerson,
                    personID: 3
                }
            ]
        }
        const newState = lensReducer(state, actions.removePerson(2))
        expect(newState.people.map(person => person.personID)).toEqual([1, 3])
    })
})