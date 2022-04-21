import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk'
import {
  getMonthToDateItemsById,
  getYearToDateItemsById,
  upsertItemAndGetMonthToDateItems,
  upsertItemAndGetYearToDateItems,
  deleteItemAndGetMonthToDateItems,
  resetItems,
  itemDetailsReducer,
  TItemsAction,
  TItemsAllState, deleteItemAndGetYearToDateItems,
} from './items'
import {
  getWalletsDetails,
  createWallet,
  updateWallet,
  deleteWallet,
  updateWalletItem,
  TWalletDetailsAction,
  TWalletDetailsAllState,
  walletDetailsReducer
} from './wallet'
import { TItemDto, TWalletDto, TWalletItemDto } from '@crab-models'
import wallet from "../components/wallet/Wallet";

const THUNK_TIMEOUT = 1500

type TActions = TItemsAction | TWalletDetailsAction
type TStates = TItemsAllState | TWalletDetailsAllState

type TThunkResult<R> = ThunkAction<R, TStates, undefined, TActions>

const rootReducers = combineReducers({
  itemDetails: itemDetailsReducer,
  walletDetails: walletDetailsReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk as ThunkMiddleware<TStates, TActions>))
export type TRootState = ReturnType<typeof rootReducers>
export type TAppDispatch = typeof store.dispatch

const mapStateToProps = (state: TRootState) => ({
  /** ITEM STATES */
  itemDetails: state.itemDetails.payload,

  /** WALLET STATES */
  walletDetails: state.walletDetails.payload
})

export const connector = connect(mapStateToProps)
export type TPropsFromRedux = ConnectedProps<typeof connector>

/** MIDDLEWARE */

// export function splashThunk(): TThunkResult<Promise<TActions>>{
//   return async (dispatch) => {
//     return new Promise<TActions>(resolve => {
//       setTimeout(() => {
//         const splashAction = getMonthToDateItems()
//           .then(success => dispatch(success))
//           .then(() => getYearToDateItems().then(success => dispatch(success)))
//
//         resolve(splashAction)
//       }, THUNK_TIMEOUT)
//     })
//   }
// }

export function getMonthToDateItemsByIdThunk(walletId: string): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const itemsAction = getMonthToDateItemsById(walletId)
          .then(success => dispatch(success))

        resolve(itemsAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function getYearToDateItemsByIdThunk(walletId: string): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const itemsAction = getYearToDateItemsById(walletId)
          .then(success => dispatch(success))

        resolve(itemsAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function resetItemsThunk(): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      const itemsAction = resetItems()
        .then(success => dispatch(success))

      resolve(itemsAction)
    })
  }
}

export function upsertMonthToDateByIdThunk(itemDto: TItemDto, walletId: string): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const monthToDateAction = upsertItemAndGetMonthToDateItems(itemDto, walletId)
          .then(success => dispatch(success))

        resolve(monthToDateAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function upsertYearToDateByIdThunk(itemDto: TItemDto, walletId: string): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const yearToDateAction = upsertItemAndGetYearToDateItems(itemDto, walletId)
          .then(success => dispatch(success))

        resolve(yearToDateAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function deleteItemMonthToDateThunk(itemDto: TItemDto, id: string): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const monthToDateAction = deleteItemAndGetMonthToDateItems(itemDto, id)
          .then(success => dispatch(success))
          //.then(() => getYearToDateItems().then(success => dispatch(success)))

        resolve(monthToDateAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function deleteItemYearToDateThunk(itemDto: TItemDto, id: string): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const yearToDateAction = deleteItemAndGetYearToDateItems(itemDto, id)
          .then(success => dispatch(success))

        resolve(yearToDateAction)
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

export function updateWalletItemThunk(walletItemDto: TWalletItemDto): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const walletsAction = updateWalletItem(walletItemDto)
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
