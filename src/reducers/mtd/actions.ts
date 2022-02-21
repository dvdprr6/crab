import { MONTH_TO_DATE_GET_SUCCESS, TMonthToDateAction } from './types'
import { Item } from '@crab-modules'
import { createAction } from '../types'

export function getMonthToDateItems(): Promise<TMonthToDateAction>{
  return new Promise<TMonthToDateAction>(async resolve => {
    const items = await Item.getMonthToDateItems()

    const payload = {
      value: items,
      isError: false,
      error: ''
    }

    resolve(createAction(MONTH_TO_DATE_GET_SUCCESS, payload))
  })
}
