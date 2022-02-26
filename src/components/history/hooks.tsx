import { TItemDto } from '@crab-models'
import moment from 'moment'
import _ from 'lodash'
import { EXPENSE, REVENUE, calculateLeverageStatus } from '@crab-utils'

type THistoryInfo = {
  status: string
  month: string
  revenue: number
  expenses: number
  savings: number
  chartData: Array<any>
  items: TItemDto[]
}

export function useHistory(itemDto: TItemDto[]): THistoryInfo[]{
  let historyInfo: THistoryInfo[] = []

  if(!_.isEmpty(itemDto)){
    historyInfo = calculateHistoryInfo(itemDto)
  }

  return historyInfo
}

function calculateHistoryInfo(itemDto: TItemDto[]): THistoryInfo[] {
  const groupByMonth = _.groupBy(itemDto, item => moment(item.createDate).format('MMMM'))

  const keys = _.keys(groupByMonth)

  const historyInfo = keys.map(item => {
    const itemDto = _.get(groupByMonth, item)

    const sortedItemDescending = _.sortBy(itemDto, item => moment(item.createDate).millisecond()).reverse()

    const month = item

    const revenueItems = sortedItemDescending.filter(x => x.itemType === REVENUE).map(x => x.amount)
    const expenseItems = sortedItemDescending.filter(x => x.itemType === EXPENSE).map(x => x.amount)

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
