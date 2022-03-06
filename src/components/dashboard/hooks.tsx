import { TItemDto, TUseDashboard } from '@crab-models'
import { EXPENSE, REVENUE, GREEN_STATUS, calculateLeverageStatus } from '@crab-utils'
import _ from 'lodash'

export function useDashboard(itemDto: TItemDto[]): TUseDashboard{
  let dashboardInfo: TUseDashboard = {
    status: GREEN_STATUS,
    revenue: 0.00,
    expenses: 0.00,
    savings: 0.00,
    chartData: [],
    topThreeExpense: []
  }

  if(!_.isEmpty(itemDto)){
    dashboardInfo = calculateDashboardInfo(itemDto)
  }

  return dashboardInfo
}

function calculateDashboardInfo(itemDto: TItemDto[]): TUseDashboard{
  const filterRevenueItems = itemDto.filter(item => item.itemType === REVENUE)
  const filterExpenseItems = itemDto.filter(item => item.itemType === EXPENSE)

  const revenueItems = filterRevenueItems.map(item => item.amount)
  const expensesItems = filterExpenseItems.map(item => item.amount)

  const revenue = _.sum(revenueItems)
  const expenses = _.sum(expensesItems)
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

  const sortByAmount = _.sortBy(filterExpenseItems, item => item.amount).reverse()

  const topThreeExpense = _.take(sortByAmount, 3)

  return { status, revenue, expenses, savings, chartData, topThreeExpense }
}
