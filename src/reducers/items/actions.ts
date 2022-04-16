import { MONTH_TO_DATE_GET_SUCCESS, YEAR_TO_DATE_GET_SUCCESS, RESET_ITEMS, TItemsAction } from './types'
import { Item } from '@crab-modules'
import { createAction } from '../types'
import { TItemDto } from '@crab-models'

export function getMonthToDateItemsById(id: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    const itemDetails = await Item.getMonthToDateItemsById(id)

    resolve(createAction(MONTH_TO_DATE_GET_SUCCESS, itemDetails))
  })
}

export function getYearToDateItemsById(id: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    const itemDetails = await Item.getYearToDateItemsById(id)

    resolve(createAction(YEAR_TO_DATE_GET_SUCCESS, itemDetails))
  })
}

export function resetItems(): Promise<TItemsAction>{
  return new Promise<TItemsAction>(resolve => {
    resolve(createAction(RESET_ITEMS, undefined))
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
