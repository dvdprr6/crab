import { TAction, TState } from '../types'
import { TWalletDetailsDto } from '@crab-models'

export const WALLET_DETAILS_GET_ALL_SUCCESS = 'WALLET_DETAILS_GET_ALL_SUCCESS'
export const WALLET_DETAILS_CREATE_SUCCESS = 'WALLET_DETAILS_CREATE_SUCCESS'
export const WALLET_DETAILS_UPDATE_SUCCESS = 'WALLET_DETAILS_UPDATE_SUCCESS'
export const WALLET_DETAILS_DELETE_SUCCESS = 'WALLET_DETAILS_DELETE_SUCCESS'

type TWalletDetailsGetAllSuccess = TAction<typeof WALLET_DETAILS_GET_ALL_SUCCESS, TWalletDetailsDto[]>
type TWalletDetailsCreateSuccess = TAction<typeof WALLET_DETAILS_CREATE_SUCCESS, TWalletDetailsDto[]>
type TWalletDetailsUpdateSuccess = TAction<typeof WALLET_DETAILS_UPDATE_SUCCESS, TWalletDetailsDto[]>
type TWalletDetailsDeleteSuccess = TAction<typeof WALLET_DETAILS_DELETE_SUCCESS, TWalletDetailsDto[]>

export type TWalletDetailsAction = TWalletDetailsGetAllSuccess | TWalletDetailsCreateSuccess | TWalletDetailsUpdateSuccess | TWalletDetailsDeleteSuccess

export type TWalletDetailsAllState = TState<TWalletDetailsDto[]>
