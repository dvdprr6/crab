import { TAction, TState } from '../types'
import { TWalletDetailsDto } from '@crab-models'

export const WALLET_DETAILS_GET_ALL_SUCCESS = 'WALLET_DETAILS_GET_ALL_SUCCESS'

type TWalletDetailsGetAllSuccess = TAction<typeof WALLET_DETAILS_GET_ALL_SUCCESS, TWalletDetailsDto[]>

export type TWalletDetailsAction = TWalletDetailsGetAllSuccess

export type TWalletDetailsAllState = TState<TWalletDetailsDto[]>
