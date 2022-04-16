import React, { FC, useCallback, useState, useEffect } from 'react'
import { TScreenNavigationProps, TScreenProps, TScreenRouteProps } from '../types'
import { TPropsFromRedux, connector, TAppDispatch, getMonthToDateItemsByIdThunk, getYearToDateItemsByIdThunk, resetItemsThunk } from '@crab-reducers'
import { SubBar } from '@crab-common-components'
import { Layout, TopNavigationAction, Icon } from '@ui-kitten/components'
import { useNavigation, useRoute } from '@react-navigation/native'
import Transactions from './Transactions'
import FilterForm from './FilterForm'
import { TFilterForm } from '@crab-models'
import { MTD } from '@crab-utils'
import { useDispatch } from 'react-redux'

const TransactionScreen: FC<TPropsFromRedux & TScreenProps> = (props) => {
  const { route, itemDetails } = props
  const [filter, setFilter] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<TScreenNavigationProps>()
  const xroute = useRoute<TScreenRouteProps>()
  const dispatch: TAppDispatch = useDispatch()

  const onOpenFilter = useCallback(() => setFilter(true), [filter])
  const onCloseFilter = useCallback(() => setFilter(false), [filter])

  const onSubmitFilter = (form: TFilterForm) => {
    setLoading(true)
    if(form.filter === MTD){
      //@ts-ignore
      dispatch(getMonthToDateItemsByIdThunk(route.params?.walletId)).then(() => {
        setLoading(false)
        setFilter(false)
      })
    }else{
      //@ts-ignore
      dispatch(getYearToDateItemsByIdThunk(route.params?.walletId)).then(() => {
        setLoading(false)
        setFilter(false)
      })
    }
  }

  useEffect(() => {
    dispatch(resetItemsThunk()).then()
  }, [])

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
          <Transactions itemsDetails={itemDetails}/>
      </Layout>
      <Layout>
        <FilterForm
          open={filter}
          onSubmit={onSubmitFilter}
          onClose={onCloseFilter}
          loading={loading}
        />
      </Layout>
    </Layout>
  )
}

export default connector(TransactionScreen)
