import { TAction, TPayloadDto, TState } from '../types'
import { TWalletDto } from '@crab-models'

export const WALLET_GET_ALL_SUCCESS = 'WALLET_GET_ALL_SUCCESS'

type TWalletGetAllSuccess = TAction<typeof WALLET_GET_ALL_SUCCESS, TPayloadDto<TWalletDto[]>>

export type TWalletAction = TWalletGetAllSuccess

export type TWalletAllState = TState<TWalletDto[]>
