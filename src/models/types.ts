import { RenderProp } from '@ui-kitten/components/devsupport'
import { MTD, YTD } from '@crab-utils'

/** DTOs */

export type TWalletDto = {
  id?: string
  name: string
  createDate?: string
}

export type TWalletDetailsDto = {
  id: string
  name: string
  totalExpense: number
  totalRevenue: number
  totalSavings: number
  createDate: string
}

export type TItemDto = {
  id?: string
  name: string
  amount: number
  recurring: boolean
  type: string
  createDate?: string
}

export type TWalletItemDto = {
  name: string
  amount: boolean
  wallet: TWalletDto
  recurring: boolean
  type: string
}

/** FORM TYPES */

export type TMonthForm = TItemDto
export type TWalletForm = TWalletDto
export type TWalletItemForm = TWalletItemDto

export type TFilterForm = {
  filter: typeof MTD | typeof YTD
}

/** SCREENS */

export type TAppBar = {
  accessoryRight?: RenderProp
  accessoryLeft?: RenderProp
}

export type TSubBar = {
  accessoryRight?: RenderProp
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

