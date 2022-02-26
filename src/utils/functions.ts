import _ from 'lodash'
import { GREEN_STATUS, YELLOW_STATUS, RED_STATUS} from './constants'

export function calculateLeverageStatus(revenue: number, expenses: number): string {
  const debtRatio = _.divide(expenses, revenue)
  let status = ''

  if(debtRatio <= 0.7){
    status = GREEN_STATUS
  }else if(debtRatio > 0.7 && debtRatio <= 0.9){
    status = YELLOW_STATUS
  }else{
    status = RED_STATUS
  }

  return status
}
