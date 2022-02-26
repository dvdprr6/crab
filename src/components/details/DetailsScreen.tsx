import React from 'react'
import { Layout } from '@ui-kitten/components'
import Details from './Details'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TScreenNavigationProps, TScreenRouteProps } from '../types'
import { SubBar } from '@crab-common-components'

const DetailsScreen = () => {
  const navigation = useNavigation<TScreenNavigationProps>()
  const route = useRoute<TScreenRouteProps>()

  return (
    <Layout style={{ flex: 1 }}>
      <SubBar navigation={navigation} route={route} />
      <Details navigation={navigation} route={route} />
    </Layout>
  )
}

export default DetailsScreen
