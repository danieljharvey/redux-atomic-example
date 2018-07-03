import { LensPerson, LensState } from "./lensTypes"
import { Lens } from 'monocle-ts'

import { IStoreState } from '../Store'

// Store -> LensState
const lensStateL = Lens.fromProp<IStoreState, 'lens'>('lens')

// LensState -> LensState['nextPersonID']
const nextPersonIDL = Lens.fromProp<LensState, 'nextPersonID'>('nextPersonID')

// LensState -> LensState['people']
const peopleL = Lens.fromProp<LensState, 'people'>('people')

// LensState -> LensState['warning']
const warningL = Lens.fromProp<LensState, 'warning'>('warning')

// LensState -> LensState['firstUserCount']
const firstUserCountL = Lens.fromProp<LensState, 'firstUserCount'>('firstUserCount')

// LensState -> LensState['editPerson']
const editPersonL = Lens.fromProp<LensState, 'editPerson'>('editPerson')

// LensPerson -> LensPerson['age']
const ageL = Lens.fromProp<LensPerson, 'age'>('age')

// LensPerson -> LensPerson['firstName']
const firstNameL = Lens.fromProp<LensPerson, 'firstName'>('firstName')

// LensPerson -> LensPerson['lastName']
const lastNameL = Lens.fromProp<LensPerson, 'lastName'>('lastName')

// LensPerson -> LensPerson['firstName']
const personIDL = Lens.fromProp<LensPerson, 'personID'>('personID')

// state -> state
export const selectors = {
    nextPersonID: lensStateL.compose(nextPersonIDL).get,
    editPerson: {
        age: lensStateL.compose(editPersonL).compose(ageL).get,
        firstName: lensStateL.compose(editPersonL).compose(firstNameL).get,
        lastName: lensStateL.compose(editPersonL).compose(lastNameL).get,
        personID: lensStateL.compose(editPersonL).compose(personIDL).get
    },
    people: lensStateL.compose(peopleL).get,
    warning: lensStateL.compose(warningL).get,
    firstUserCount: lensStateL.compose(firstUserCountL).get
}

/*
// PersonState -> PersonState
const reducers = {
    incrementFirstUserCount: firstUserCount.modify(x => x + 1),
    setFirstUserCount: firstUserCount.set
}
*/