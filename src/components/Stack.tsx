import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { TRootStackParamList, DASHBOARD_SCREEN } from './types'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DashboardScreen } from './dashboard'

const RootSack = createNativeStackNavigator<TRootStackParamList>()

const Stack = () => {
  return (
    <NavigationContainer>
      <RootSack.Navigator /*screenOptions={{ headerMode: 'screen' }}*/>
        <RootSack.Screen name={DASHBOARD_SCREEN} component={DashboardScreen} options={{ headerShown: false }} />
      </RootSack.Navigator>
    </NavigationContainer>
  )
}
export default Stack
