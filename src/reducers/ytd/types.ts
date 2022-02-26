import { TAction, TPayloadDto, TState } from '../types'
import { TItemDto } from '@crab-models'

export const YEAR_TO_DATE_GET_SUCCESS = 'YEAR_TO_DATE_GET_SUCCESS'

type TYearToDateGetSuccess = TAction<typeof YEAR_TO_DATE_GET_SUCCESS, TPayloadDto<TItemDto[]>>

export type TYearToDateAction = TYearToDateGetSuccess

export type TYearToDateAllState = TState<TItemDto[]>
