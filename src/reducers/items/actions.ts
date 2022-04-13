import { MONTH_TO_DATE_GET_SUCCESS, TItemsAction } from './types'
import { Item } from '@crab-modules'
import { createAction } from '../types'
import { TItemDto } from '@crab-models'

export function getMonthToDateItems(): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    const items = await Item.getMonthToDateItems()

    resolve(createAction(MONTH_TO_DATE_GET_SUCCESS, items))
  })
}

export function upsertItemAndGetMonthToDateItems(itemDto: TItemDto): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    await Item.upsertItem(itemDto)

    const items = await Item.getMonthToDateItems()

    resolve(createAction(MONTH_TO_DATE_GET_SUCCESS, items))
  })
}

export function deleteItemAndGetMonthToDateItems(itemDto: TItemDto): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    await Item.deleteItem(itemDto)

    const items = await Item.getMonthToDateItems()


    resolve(createAction(MONTH_TO_DATE_GET_SUCCESS, items))
  })
}
