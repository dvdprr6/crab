import { TAction, TState } from '../types'
import { TItemDetailsDto } from '@crab-models'

export const MONTH_TO_DATE_GET_SUCCESS = 'MONTH_TO_DATE_GET_SUCCESS'
export const YEAR_TO_DATE_GET_SUCCESS = 'YEAR_TO_DATE_GET_SUCCESS'
export const RESET_ITEMS = 'RESET_ITEMS'

type TMonthToDateGetSuccess = TAction<typeof MONTH_TO_DATE_GET_SUCCESS, TItemDetailsDto>
type TYearToDateGetSuccess = TAction<typeof YEAR_TO_DATE_GET_SUCCESS, TItemDetailsDto>
type TResetItems = TAction<typeof RESET_ITEMS, undefined>

export type TItemsAction = TMonthToDateGetSuccess | TYearToDateGetSuccess | TResetItems

export type TItemsAllState = TState<TItemDetailsDto>
