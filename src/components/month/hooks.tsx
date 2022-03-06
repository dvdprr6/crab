import { TItemDto } from '@crab-models'
import moment from 'moment'
import _ from 'lodash'
import { EXPENSE, REVENUE, GREEN_STATUS, calculateLeverageStatus } from '@crab-utils'
import { TUseMonth } from '@crab-models'

export function useMonth(itemDto: TItemDto[]): TUseMonth {

  let monthInfo: TUseMonth = {
    status: GREEN_STATUS,
    month: moment().format('MMMM'),
    revenue: 0.00,
    expenses: 0.00,
    savings: 0.00,
    items: []
  }

  if(!_.isEmpty(itemDto)){
    monthInfo = calculateMonthInfo(itemDto)
  }

  return monthInfo
}

function calculateMonthInfo(itemDto: TItemDto[]): TUseMonth{
  const sortedItemDescending = _.sortBy(itemDto, item => moment(item.createDate).millisecond()).reverse()

  const firstItem = _.head(sortedItemDescending)

  const month = moment(firstItem?.createDate).format('MMMM')

  const revenueItems = sortedItemDescending.filter(item => item.itemType === REVENUE).map(item => item.amount)
  const expenseItems = sortedItemDescending.filter(item => item.itemType === EXPENSE).map(item => item.amount)

  const revenue = _.sum(revenueItems)
  const expenses = _.sum(expenseItems)

  const savings = _.subtract(revenue, expenses)

  const status = calculateLeverageStatus(revenue, expenses)

  return { status, month, revenue, expenses, savings, items: itemDto }
}
