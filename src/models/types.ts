import { RenderProp } from '@ui-kitten/components/devsupport'

/** DTOs */

export type TWalletDto = {
  id?: string
  name: string
  createDate?: string
}

export type TItemDto = {
  id?: string
  itemName: string
  amount: number
  recurring: boolean
  itemType: string
  createDate?: string
  modifiedDate?: string
}

/** FORM TYPES */

export type TMonthForm = TItemDto

/** SCREENS */

export type TAppBar = {
  accessoryRight?: RenderProp
  accessoryLeft?: RenderProp
}

export type TUseDashboard = {
  status: string
  revenue: number
  expenses: number
  savings: number
  chartData: Array<any>
  topThreeExpense: TItemDto[]
}

export type TUseMonth = {
  status: string
  month: string
  revenue: number
  expenses: number
  savings: number
  items: TItemDto[]
}

export type TUseHistory = {
  status: string
  month: string
  revenue: number
  expenses: number
  savings: number
  chartData: Array<any>
  items: TItemDto[]
}

