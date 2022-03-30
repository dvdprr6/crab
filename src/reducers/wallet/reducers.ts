import { WALLET_GET_ALL_SUCCESS, TWalletAction, TWalletAllState } from './types'

const INITIAL_ALL_STATE: TWalletAllState = {
  payload: {
    value: [],
    isError: false,
    error: ''
  }
}

export function walletAllReducer(state = INITIAL_ALL_STATE, action: TWalletAction): TWalletAllState{
  switch(action.type){
    case WALLET_GET_ALL_SUCCESS:
      return { payload: action.payload }
    default:
      return state
  }
}
