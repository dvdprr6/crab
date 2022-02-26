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
