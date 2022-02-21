import { TAction, TPayloadDto, TState } from '../types'
import { TItemDto } from '@crab-models'

export const MONTH_TO_DATE_GET_SUCCESS = 'MONTH_TO_DATE_GET_SUCCESS'

type TMonthToDateGetSuccess = TAction<typeof MONTH_TO_DATE_GET_SUCCESS, TPayloadDto<TItemDto[]>>

export type TMonthToDateAction = TMonthToDateGetSuccess

export type TMonthToDateAllState = TState<TItemDto[]>
