export type TItemDto = {
  id?: string
  itemName: string
  amount: number
  recurring: boolean
  itemType: string
  createTime?: string
  modifiedTime?: string
}

// export type TMonthDto = {
//   month: string
//   status: 'GREEN' | 'YELLOW' | 'RED'
//   monthRevenue: number
//   monthExpense: number
//   items: TItemDto[]
// }

/** FORM TYPES */

export type TMonthForm = TItemDto

export type TBudgeForm = {
  id?: number
  budget: number
}
