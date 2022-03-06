import { RenderProp } from "@ui-kitten/components/devsupport";

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

export type TUseMonth = {
  status: string
  month: string
  revenue: number
  expenses: number
  savings: number
  items: TItemDto[]
}
