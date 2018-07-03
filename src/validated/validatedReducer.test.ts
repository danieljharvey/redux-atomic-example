import { initialState, validatedActionTypes, actions, validatedReducer } from './validatedReducer'

describe('Validated Reducer', () => {
    it("Creates the actions successfully", () => {
        expect(validatedActionTypes).toEqual(['Validated_addUser',
            'Validated_removeUser',
            'Validated_setAge',
            'Validated_setFirstName',
            'Validated_setLastName',
            'Validated_updateCount']
        )
    })

    it("Uses the action", () => {
        const newState: any = validatedReducer(initialState, actions.onSetAge("10"))
        expect(newState.editPerson.age).toEqual(10)
    })
})