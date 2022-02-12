import React from 'react'
import { Layout } from '@ui-kitten/components'
import Settings from './Settings'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TScreenNavigationProps, TScreenRouteProps } from '../types'
import { SubBar } from '@crab-common-components'

const SettingsScreen = () => {
  const navigation = useNavigation<TScreenNavigationProps>()
  const route = useRoute<TScreenRouteProps>()

  return(
    <Layout style={{ flex: 1 }}>
      <SubBar navigation={navigation} route={route} />
      <Settings />
    </Layout>
  )
}

export default SettingsScreen
