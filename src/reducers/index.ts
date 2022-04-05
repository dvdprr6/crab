import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk'
import {
  getMonthToDateItems,
  upsertItemAndGetMonthToDateItems,
  deleteItemAndGetMonthToDateItems,
  monthToDateAllReducer,
  TMonthToDateAction,
  TMonthToDateAllState
} from './mtd'
import {
  getYearToDateItems,
  yearToDateAllReducer,
  TYearToDateAction,
  TYearToDateAllState
} from './ytd'
import {
  getWalletsDetails,
  createWallet,
  updateWallet,
  deleteWallet,
  TWalletDetailsAction,
  TWalletDetailsAllState,
  walletDetailsReducer
} from './wallet'
import { TItemDto, TWalletDto } from '@crab-models'

const THUNK_TIMEOUT = 1500

type TActions = TMonthToDateAction | TYearToDateAction | TWalletDetailsAction
type TStates = TMonthToDateAllState | TYearToDateAllState | TWalletDetailsAllState

type TThunkResult<R> = ThunkAction<R, TStates, undefined, TActions>

const rootReducers = combineReducers({
  monthToDateItems: monthToDateAllReducer,
  yearToDateItems: yearToDateAllReducer,
  walletDetails: walletDetailsReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk as ThunkMiddleware<TStates, TActions>))
export type TRootState = ReturnType<typeof rootReducers>
export type TAppDispatch = typeof store.dispatch

const mapStateToProps = (state: TRootState) => ({
  /** ITEM STATES */
  monthToDateItems: state.monthToDateItems.payload,
  yearToDateItems: state.yearToDateItems.payload,

  /** WALLET STATES */
  walletDetails: state.walletDetails.payload
})

export const connector = connect(mapStateToProps)
export type TPropsFromRedux = ConnectedProps<typeof connector>

/** MIDDLEWARE */

export function splashThunk(): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const splashAction = getMonthToDateItems()
          .then(success => dispatch(success))
          .then(() => getYearToDateItems().then(success => dispatch(success)))

        resolve(splashAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function upsertMonthToDateThunk(itemDto: TItemDto): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const monthToDateAction = upsertItemAndGetMonthToDateItems(itemDto)
          .then(success => dispatch(success))
          .then(() => getYearToDateItems().then(success => dispatch(success)))

        resolve(monthToDateAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function deleteMonthToDateThunk(itemDto: TItemDto): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const monthToDateAction = deleteItemAndGetMonthToDateItems(itemDto)
          .then(success => dispatch(success))
          .then(() => getYearToDateItems().then(success => dispatch(success)))

        resolve(monthToDateAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function getAllWalletsDetailsThunk(): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const walletsAction = getWalletsDetails()
          .then(success => dispatch(success))

        resolve(walletsAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function createWalletThunk(walletDto: TWalletDto): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const walletsAction = createWallet(walletDto)
          .then(success => dispatch(success))

        resolve(walletsAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function updateWalletThunk(walletDto: TWalletDto): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const walletsAction = updateWallet(walletDto)
          .then(success => dispatch(success))

        resolve(walletsAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function deleteWalletThunk(walletDto: TWalletDto): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const walletsAction = deleteWallet(walletDto)
          .then(success => dispatch(success))

        resolve(walletsAction)
      }, THUNK_TIMEOUT)
    })
  }
}
