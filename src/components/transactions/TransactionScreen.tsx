import React, { FC, useEffect, useState } from 'react'
import { TScreenNavigationProps, TScreenProps, TScreenRouteProps } from '../types'
import { TPropsFromRedux, connector } from '@crab-reducers'
import { LoadingSpinner, SubBar } from '@crab-common-components'
import { Layout, Text } from '@ui-kitten/components'
import { useNavigation, useRoute } from '@react-navigation/native'

const TransactionScreen: FC<TPropsFromRedux & TScreenProps> = (props) => {
  const { route } = props
  const [screenLoading, setScreenLoading] = useState<boolean>(false)
  const navigation = useNavigation<TScreenNavigationProps>()
  const xroute = useRoute<TScreenRouteProps>()

  return(
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <SubBar navigation={navigation} route={xroute} />
        {screenLoading ? (
          <LoadingSpinner />
        ) : (
          <Text>This is transaction</Text>
        )}
      </Layout>
    </Layout>
  )
}

export default connector(TransactionScreen)
