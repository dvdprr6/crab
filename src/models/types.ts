export type TSettingsDto = {
  id?: string
  budget: number
}

export type TMonthForm = {
  id?: number
  itemName: string
  amount: number
  reocurring: boolean
  itemType: 'EXPENSE' | 'REVENUE'
}

export type TBudgeForm = {
  id?: number
  budget: number
}
