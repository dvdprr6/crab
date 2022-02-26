import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { TItemDto } from '@crab-models'

export const SPLASH_SCREEN = 'SplashScreen'
export const MAIN_SCREEN = 'MainScreen'
export const DASHBOARD_SCREEN = 'DashboardScreen'
export const MONTH_SCREEN = 'MonthScreen'
export const HISTORY_SCREEN = 'HistoryScreen'
export const DETAILS_SCREEN = 'DetailsScreen'

type TSplashScreen = typeof SPLASH_SCREEN
type TMainScreen = typeof MAIN_SCREEN
type TDashboardScreen = typeof DASHBOARD_SCREEN
type TMonthScreen = typeof MONTH_SCREEN
type THistoryScreen = typeof HISTORY_SCREEN
type TDetailsScreen = typeof DETAILS_SCREEN

type TScreen = TSplashScreen | TMainScreen | TDashboardScreen | TMonthScreen | THistoryScreen | TDetailsScreen

export type TRootStackParamList = {
  SplashScreen: undefined
  MainScreen: undefined
  DashboardScreen: undefined
  MonthScreen: undefined
  HistoryScreen: undefined
  DetailsScreen: { status: string, revenue: number, expenses: number, savings: number, chartData: Array<any>, items: TItemDto[] }
}

export type TScreenRouteProps = RouteProp<TRootStackParamList, TScreen>
export type TScreenNavigationProps = NativeStackNavigationProp<TRootStackParamList, TScreen>
export type TScreenProps = NativeStackScreenProps<TRootStackParamList, TScreen>
