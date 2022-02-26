import { YEAR_TO_DATE_GET_SUCCESS, TYearToDateAction, TYearToDateAllState } from './types'

const INITIAL_ALL_STATE: TYearToDateAllState = {
  payload: {
    value: [],
    isError: false,
    error: ''
  }
}

export function yearToDateAllReducer(state = INITIAL_ALL_STATE, action: TYearToDateAction): TYearToDateAllState{
  switch(action.type){
    case YEAR_TO_DATE_GET_SUCCESS:
      return { payload: action.payload }
    default:
      return state
  }
}
