import React from 'react'
import { Layout } from '@ui-kitten/components'
import Dashboard from './Dashboard'
import { AppBar } from '@crab-common-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TScreenNavigationProps, TScreenRouteProps } from '../types'

const DashboardScreen = () => {
  const navigation = useNavigation<TScreenNavigationProps>()
  const route = useRoute<TScreenRouteProps>()

  return (
    <Layout style={{ flex: 1 }}>
      <AppBar />
      <Dashboard navigation={navigation} route={route} />
    </Layout>
  )
}

export default DashboardScreen
