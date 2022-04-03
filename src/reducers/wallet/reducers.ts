import {
  TWalletDetailsAction,
  TWalletDetailsAllState,
  WALLET_DETAILS_CREATE_SUCCESS,
  WALLET_DETAILS_GET_ALL_SUCCESS,
  WALLET_DETAILS_UPDATE_SUCCESS,
} from "./types";

const INITIAL_WALLET_DETAILS_STATE: TWalletDetailsAllState = {
  payload: []
}

export function walletDetailsReducer(state = INITIAL_WALLET_DETAILS_STATE, action: TWalletDetailsAction): TWalletDetailsAllState{
  switch(action.type){
    case WALLET_DETAILS_GET_ALL_SUCCESS:
    case WALLET_DETAILS_CREATE_SUCCESS:
    case WALLET_DETAILS_UPDATE_SUCCESS:
      return { payload: action.payload }
    default:
      return state
  }
}
