import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  TRootStackParamList,
  SPLASH_SCREEN, MAIN_SCREEN, DASHBOARD_SCREEN, MONTH_SCREEN, WALLET_SCREEN, HISTORY_SCREEN, DETAILS_SCREEN
} from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DashboardScreen } from './dashboard'
import { MonthScreen } from './month'
import { WalletScreen } from './wallet'
import { HistoryScreen } from './history'
import { DetailsScreen } from './details'
import { SplashScreen } from './splash'
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const { Navigator, Screen } = createBottomTabNavigator<TRootStackParamList>()
const RootSack = createNativeStackNavigator<TRootStackParamList>()

const BottomTabBar: FC<{ navigation: any, state: any }> = (props) => {
  const { navigation, state } = props

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index: React.ReactText) => navigation.navigate(state.routeNames[index])}
      appearance={'noIndicator'}
    >
      <BottomNavigationTab icon={props => <Icon {...props}  name={'home-outline'} />} />
      <BottomNavigationTab icon={props => <Icon {...props} name={'layers-outline'} />} />
      <BottomNavigationTab icon={props => <Icon {...props} name={'clock-outline'} /> } />
    </BottomNavigation>
  )
}

const Tabs = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
      <Screen name={DASHBOARD_SCREEN} component={DashboardScreen} />
      {/*<Screen name={MONTH_SCREEN} component={MonthScreen} />*/}
      <Screen name={WALLET_SCREEN} component={WalletScreen} />
      <Screen name={HISTORY_SCREEN} component={HistoryScreen} />
    </Navigator>
  )
}

const Stack = () => {
  return (
    <NavigationContainer>
      <RootSack.Navigator screenOptions={{ headerShown: false }}>
        <RootSack.Screen name={SPLASH_SCREEN} component={SplashScreen} />
        <RootSack.Screen name={MAIN_SCREEN} component={Tabs} options={{ headerShown: false }} />
        <RootSack.Screen name={DETAILS_SCREEN} component={DetailsScreen} />
      </RootSack.Navigator>
    </NavigationContainer>
  )
}
export default Stack
