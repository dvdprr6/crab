import { MONTH_TO_DATE_GET_SUCCESS, YEAR_TO_DATE_GET_SUCCESS, ITEM_UPDATE_SUCCESS, ITEM_DELETE_SUCCESS, RESET_ITEMS, TItemsAction } from './types'
import { Item } from '@crab-modules'
import { createAction } from '../types'
import { TItemDto } from '@crab-models'

export function getMonthToDateItemsById(walletId: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    const itemDetails = await Item.getMonthToDateItemsById(walletId)

    resolve(createAction(MONTH_TO_DATE_GET_SUCCESS, itemDetails))
  })
}

export function getYearToDateItemsById(walletId: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    const itemDetails = await Item.getYearToDateItemsById(walletId)

    resolve(createAction(YEAR_TO_DATE_GET_SUCCESS, itemDetails))
  })
}

export function upsertItemAndGetMonthToDateItems(itemDto: TItemDto, walletId: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    await Item.upsertItem(itemDto)

    const items = await Item.getMonthToDateItemsById(walletId)

    resolve(createAction(ITEM_UPDATE_SUCCESS, items))
  })
}

export function upsertItemAndGetYearToDateItems(itemDto: TItemDto, walletId: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    await Item.upsertItem(itemDto)

    const items = await Item.getYearToDateItemsById(walletId)

    resolve(createAction(ITEM_UPDATE_SUCCESS, items))
  })
}

export function deleteItemAndGetMonthToDateItems(itemDto: TItemDto, walletId: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    await Item.deleteItem(itemDto)

    const itemDetails = await Item.getMonthToDateItemsById(walletId)


    resolve(createAction(ITEM_UPDATE_SUCCESS, itemDetails))
  })
}

export function deleteItemAndGetYearToDateItems(itemDto: TItemDto, walletId: string): Promise<TItemsAction>{
  return new Promise<TItemsAction>(async resolve => {
    await Item.deleteITem(itemDto)

    const itemDetails = await Item.getYearToDateItemsById(walletId)

    resolve(createAction(ITEM_DELETE_SUCCESS, itemDetails))
  })
}

export function resetItems(): Promise<TItemsAction>{
  return new Promise<TItemsAction>(resolve => {
    resolve(createAction(RESET_ITEMS, undefined))
  })
}
