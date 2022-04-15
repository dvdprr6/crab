import { MONTH_TO_DATE_GET_SUCCESS, TItemsAction, TItemsAllState, YEAR_TO_DATE_GET_SUCCESS } from './types'

const INITIAL_ALL_STATE: TItemsAllState = {
  payload: {
    status: 'Green',
    totalExpense: 0.0,
    totalRevenue: 0.0,
    totalSavings: 0.0,
    items: []
  }
}

export function itemDetailsReducer(state = INITIAL_ALL_STATE, action: TItemsAction): TItemsAllState{
  switch(action.type){
    case MONTH_TO_DATE_GET_SUCCESS:
    case YEAR_TO_DATE_GET_SUCCESS:
      return { payload: action.payload }
    default:
      return state
  }
}
