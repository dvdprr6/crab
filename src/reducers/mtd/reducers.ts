import { MONTH_TO_DATE_GET_SUCCESS, TMonthToDateAction, TMonthToDateAllState } from './types'

const INITIAL_ALL_STATE: TMonthToDateAllState = {
  payload: {
    value: [],
    isError: false,
    error: ''
  }
}

export function monthToDateAllReducer(state = INITIAL_ALL_STATE, action: TMonthToDateAction): TMonthToDateAllState{
  switch(action.type){
    case MONTH_TO_DATE_GET_SUCCESS:
      return { payload: action.payload }
    default:
      return state
  }
}
