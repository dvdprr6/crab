import React, { FC, useCallback, useEffect, useState } from 'react'
import { TScreenNavigationProps, TScreenProps, TScreenRouteProps } from '../types'
import { TPropsFromRedux, connector } from '@crab-reducers'
import { LoadingSpinner, SubBar } from '@crab-common-components'
import { Layout, Text, TopNavigationAction, Icon } from '@ui-kitten/components'
import { useNavigation, useRoute } from '@react-navigation/native'
import Transactions from './Transactions'
import FilterForm from './FilterForm'

const TransactionScreen: FC<TPropsFromRedux & TScreenProps> = (props) => {
  const { route, itemsAll } = props
  const [screenLoading, setScreenLoading] = useState<boolean>(false)
  const [filter, setFilter] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<TScreenNavigationProps>()
  const xroute = useRoute<TScreenRouteProps>()

  const onOpenFilter = useCallback(() => setFilter(true), [filter])
  const onCloseFilter = useCallback(() => setFilter(false), [filter])

  const onSubmit = (form: any) => {

  }

  return(
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <SubBar
          navigation={navigation}
          route={xroute}
          accessoryRight={() => (
            <TopNavigationAction
              onPress={() => onOpenFilter()}
              icon={props => <Icon {...props} name={'funnel-outline'} />}
            />
          )}
        />
        {screenLoading ? (
          <LoadingSpinner />
        ) : (
          <Transactions items={itemsAll}/>
        )}
      </Layout>
      <Layout>
        <FilterForm
          open={filter}
          onSubmit={onSubmit}
          onClose={onCloseFilter}
          loading={loading}
        />
      </Layout>
    </Layout>
  )
}

export default connector(TransactionScreen)
