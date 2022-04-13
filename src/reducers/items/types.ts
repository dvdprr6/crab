import { TAction, TState } from '../types'
import { TItemDto } from '@crab-models'

export const MONTH_TO_DATE_GET_SUCCESS = 'MONTH_TO_DATE_GET_SUCCESS'
export const YEAR_TO_DATE_GET_SUCCESS = 'YEAR_TO_DATE_GET_SUCCESS'

type TMonthToDateGetSuccess = TAction<typeof MONTH_TO_DATE_GET_SUCCESS, TItemDto[]>
type TYearToDateGetSuccess = TAction<typeof YEAR_TO_DATE_GET_SUCCESS, TItemDto[]>

export type TItemsAction = TMonthToDateGetSuccess | TYearToDateGetSuccess

export type TItemsAllState = TState<TItemDto[]>
