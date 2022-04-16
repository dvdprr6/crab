import { TItemDto, TUseHistory } from '@crab-models'
import moment from 'moment'
import _ from 'lodash'
import { EXPENSE, REVENUE, calculateLeverageStatus } from '@crab-utils'

export function useHistory(itemDto: TItemDto[]): TUseHistory[]{
  let historyInfo: TUseHistory[] = []

  if(!_.isEmpty(itemDto)){
    historyInfo = calculateHistoryInfo(itemDto)
  }

  return historyInfo
}

function calculateHistoryInfo(itemDto: TItemDto[]): TUseHistory[] {
  const groupByMonth = _.groupBy(itemDto, item => moment(item.createDate).format('MMMM'))

  const keys = _.keys(groupByMonth)

  const historyInfo = keys.map(item => {
    const itemDto = _.get(groupByMonth, item)

    const sortedItemDescending = _.sortBy(itemDto, item => moment(item.createDate).millisecond()).reverse()

    const month = item

    const revenueItems = sortedItemDescending.filter(x => x.type === REVENUE).map(x => x.amount)
    const expenseItems = sortedItemDescending.filter(x => x.type === EXPENSE).map(x => x.amount)

    const revenue = _.sum(revenueItems)
    const expenses = _.sum(expenseItems)

    const savings = _.subtract(revenue, expenses)

    const status = calculateLeverageStatus(revenue, expenses)

    const chartData = [
      {
        name: 'Expenses',
        population: expenses,
        color: '#d84e4b',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      },
      {
        name: 'Revenue',
        population: revenue,
        color: '#ffbc2c',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      }
    ]

    return { status, month, revenue, expenses, savings, chartData, items: itemDto }
  })

  return historyInfo
}
