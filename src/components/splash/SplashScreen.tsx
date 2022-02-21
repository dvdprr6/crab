import React, { FC } from 'react'
import { TScreenNavigationProps, TScreenRouteProps } from '../types'
import { Layout } from '@ui-kitten/components'
import Splash from './Splash'
import { useNavigation, useRoute } from '@react-navigation/native'

const SplashScreen = () => {
  const navigation = useNavigation<TScreenNavigationProps>()
  const route = useRoute<TScreenRouteProps>()

  return(
    <Layout style={{ flex: 1 }}>
      <Splash navigation={navigation} route={route} />
    </Layout>
  )
}

export default SplashScreen
