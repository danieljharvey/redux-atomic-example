import { Cmd } from 'redux-loop'

type GetState = any
type Selector<S, T> = (store: S) => T
type Setter<T> = (a: T) => any

/**
    * @name lensAction
    * @description Takes a getter that turns state into a data, and setter, that turns that data into an action
    * @public
    * @param {selector} Selector function that takes the entire state and returns a value
    * @param {setter} Setter function that takes the value and returns an action
    * @returns {action} Redux loop command action
    */

export function lensAction<S, T>(selector: Selector<S, T>, setter: Setter<T>) {
    return Cmd.run(lens, { args: [Cmd.getState, selector, setter], successActionCreator: identity })
}

function lens<S, T>(getState: GetState, selector: Selector<S, T>, setter: Setter<T>) {
    const state: S = getState()
    const data = selector(state);
    return setter(data)
}

function identity<T>(t: T): T {
    return t
}