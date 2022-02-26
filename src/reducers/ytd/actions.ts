import { YEAR_TO_DATE_GET_SUCCESS, TYearToDateAction } from './types'
import { Item } from '@crab-modules'
import { createAction } from '../types'

export function getYearToDateItems(): Promise<TYearToDateAction>{
  return new Promise<TYearToDateAction>(async resolve => {
    const items = await Item.getYearToDateItems()

    const payload = {
      value: items,
      isError: false,
      error: ''
    }

    resolve(createAction(YEAR_TO_DATE_GET_SUCCESS, payload))
  })
}
