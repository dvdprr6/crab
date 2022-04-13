import { MONTH_TO_DATE_GET_SUCCESS, TItemsAction, TItemsAllState, YEAR_TO_DATE_GET_SUCCESS } from './types'

const INITIAL_ALL_STATE: TItemsAllState = {
  payload: []
}

export function itemsAllReducer(state = INITIAL_ALL_STATE, action: TItemsAction): TItemsAllState{
  switch(action.type){
    case MONTH_TO_DATE_GET_SUCCESS:
    case YEAR_TO_DATE_GET_SUCCESS:
      return { payload: action.payload }
    default:
      return state
  }
}
