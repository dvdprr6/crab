import { RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'

export const DASHBOARD_SCREEN = 'DashboardScreen'

type TDashboardScreen = typeof DASHBOARD_SCREEN

type TScreen = TDashboardScreen

export type TRootStackParamList = {
  DashboardScreen: undefined
}

export type TScreenRouteProps = RouteProp<TRootStackParamList, TScreen>
export type TScreenNavigationProps = NativeStackNavigationProp<TRootStackParamList, TScreen>
export type TScreenProps = NativeStackScreenProps<TRootStackParamList, TScreen>
