import { IStoreState } from '../Store'
import { IUserState } from './userTypes'

const getUserData = (state: IStoreState): IUserState => state.user

export const getRecipientsCount = (state: IStoreState): number => getUserData(state).users.length

