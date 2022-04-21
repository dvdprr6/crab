import React, { FC, useCallback, useState, useEffect } from 'react'
import { TScreenNavigationProps, TScreenProps, TScreenRouteProps } from '../types'
import {
  TPropsFromRedux,
  connector,
  TAppDispatch,
  getMonthToDateItemsByIdThunk,
  getYearToDateItemsByIdThunk,
  upsertMonthToDateByIdThunk, upsertYearToDateByIdThunk, deleteItemMonthToDateThunk, deleteItemYearToDateThunk,
  resetItemsThunk,
} from "@crab-reducers";
import { SubBar } from '@crab-common-components'
import { Layout, TopNavigationAction, Icon } from '@ui-kitten/components'
import { useNavigation, useRoute } from '@react-navigation/native'
import Transactions from './Transactions'
import FilterForm from './FilterForm'
import { TFilterForm, TItemDto, TItemForm } from "@crab-models";
import { MTD, YTD } from '@crab-utils'
import { useDispatch } from 'react-redux'
import { DeleteDialog } from '@crab-common-components'
import ItemForm from './ItemForm'

const TransactionScreen: FC<TPropsFromRedux & TScreenProps> = (props) => {
  const { route, itemDetails } = props
  const [filter, setFilter] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [deleteItem, setDeleteItem] = useState<boolean>(false)
  const [editItem, setEditItem] = useState<boolean>(false)
  const [filterDateRange, setFilterDateRange] = useState<typeof MTD | typeof YTD | undefined>(undefined)
  const [selectedItem, setSelectedItem] = useState<TItemDto>({} as TItemDto)
  const navigation = useNavigation<TScreenNavigationProps>()
  const xroute = useRoute<TScreenRouteProps>()
  const dispatch: TAppDispatch = useDispatch()

  const onOpenFilter = useCallback(() => setFilter(true), [filter])
  const onCloseFilter = useCallback(() => setFilter(false), [filter])

  const onCloseEdit = useCallback(() => setEditItem(false), [editItem])

  const onCloseDeleteItem = useCallback(() => setDeleteItem(false), [deleteItem])

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

    setFilterDateRange(form.filter)
  }

  const onEdit = (form: TItemForm) => {
    setLoading(true)
    if(filterDateRange === MTD){
      //@ts-ignore
      dispatch(upsertMonthToDateByIdThunk(form, route.params?.walletId))
        .then(() => {
          setLoading(false)
          setEditItem(false)
        })
    }else{
      //@ts-ignore
      dispatch(upsertYearToDateByIdThunk(form, route.params?.walletId))
        .then(() => {
          setLoading(false)
          setEditItem(false)
        })
    }
  }

  const onDeleteItem = useCallback(() => {
    setLoading(true)

    if(filterDateRange === MTD){
      //@ts-ignore
      dispatch(deleteItemMonthToDateThunk(selectedItem, route.params?.walletId))
        .then(() => {
          setLoading(false)
          setDeleteItem(false)
        })
    }else{
      //@ts-ignore
      dispatch(deleteItemyearToDateThunk(selectedItem, route.params?.walletId))
        .then(() => {
          setLoading(false)
          setDeleteItem(false)
        })
    }


  }, [deleteItem, filterDateRange])

  const onSelectedItemForDelete = useCallback((itemDto: TItemDto) => {
    setSelectedItem(itemDto)
    setDeleteItem(true)
  }, [selectedItem])

  const onSelectedItemForEdit = useCallback((itemDto: TItemDto) => {
    setSelectedItem(itemDto)
    setEditItem(true)
  }, [selectedItem])

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
          <Transactions
            onSelectedItemForDelete={onSelectedItemForDelete}
            onSelectedItemForEdit={onSelectedItemForEdit}
            itemsDetails={itemDetails}
          />
      </Layout>
      <Layout>
        <FilterForm
          open={filter}
          onSubmit={onSubmitFilter}
          onClose={onCloseFilter}
          loading={loading}
        />
      </Layout>
      <Layout>
        <ItemForm
          open={editItem}
          onSubmit={onEdit}
          onClose={onCloseEdit}
          loading={loading}
          initialValues={selectedItem}
        />
      </Layout>
      <Layout>
        <DeleteDialog
          open={deleteItem}
          onDelete={onDeleteItem}
          onClose={onCloseDeleteItem}
          loading={loading}
        />
      </Layout>
    </Layout>
  )
}

export default connector(TransactionScreen)
