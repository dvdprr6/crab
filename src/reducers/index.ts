import { createStore, combineReducers, applyMiddleware } from 'redux'
import { connect, ConnectedProps } from 'react-redux'
import thunk, { ThunkAction, ThunkMiddleware } from 'redux-thunk'
import {
  getMonthToDateItems,
  monthToDateAllReducer,
  TMonthToDateAction,
  TMonthToDateAllState
} from './mtd'

const THUNK_TIMEOUT = 1500

type TActions = TMonthToDateAction
type TStates = TMonthToDateAllState

type TThunkResult<R> = ThunkAction<R, TStates, undefined, TActions>

const rootReducers = combineReducers({
  items: monthToDateAllReducer
})

export const store = createStore(rootReducers, applyMiddleware(thunk as ThunkMiddleware<TStates, TActions>))
export type TRootState = ReturnType<typeof rootReducers>
export type TAppDispatch = typeof store.dispatch

const mapStateToProps = (state: TRootState) => ({
  /** ITEM STATE */
  items: state.items.payload
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

        resolve(splashAction)
      }, THUNK_TIMEOUT)
    })
  }
}

export function yearToMonthThunk(): TThunkResult<Promise<TActions>>{
  return async (dispatch) => {
    return new Promise<TActions>(resolve => {
      setTimeout(() => {
        const yearToMonthAction = getMonthToDateItems()
          .then(success => dispatch(success))

        resolve(yearToMonthAction)
      }, THUNK_TIMEOUT)
    })
  }
}
