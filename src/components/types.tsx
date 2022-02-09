import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

export const MAIN_SCREEN = 'MainScreen'
export const DASHBOARD_SCREEN = 'DashboardScreen'
export const MONTH_SCREEN = 'MonthScreen'

type TMainScreen = typeof MAIN_SCREEN
type TDashboardScreen = typeof DASHBOARD_SCREEN
type TMonthScreen = typeof MONTH_SCREEN

type TScreen = TMainScreen | TDashboardScreen | TMonthScreen

export type TRootStackParamList = {
  MainScreen: undefined
  DashboardScreen: undefined
  MonthScreen: undefined
}

export type TScreenRouteProps = RouteProp<TRootStackParamList, TScreen>
export type TScreenNavigationProps = NativeStackNavigationProp<TRootStackParamList, TScreen>
export type TScreenProps = NativeStackScreenProps<TRootStackParamList, TScreen>
