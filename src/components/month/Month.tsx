import React, { useState, useCallback, FC, useEffect } from 'react'
import { Text, Layout, Card, Button, List, ListItem, Icon } from '@ui-kitten/components'
import { StyleSheet, Dimensions } from 'react-native'
import MonthForm from './MonthForm'
import { DeleteDialog } from '@crab-common-components'
import { TItemDto } from '@crab-models'
import { TPropsFromRedux, connector, TAppDispatch, upsertMonthToDateThunk, deleteMonthToDateThunk } from '@crab-reducers'
import { useMonth } from './hooks'
import { useDispatch } from 'react-redux'
import { EXPENSE } from '@crab-utils'

const styles = StyleSheet.create({
  card: {
    margin: 2
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const Month: FC<TPropsFromRedux> = (props) => {
  const { items: { value: itemDto } } = props
  const { status, month, revenue, expenses, savings, items } = useMonth(itemDto)
  const [openNew, setOpenNew] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<TItemDto>({} as TItemDto)
  const dispatch: TAppDispatch = useDispatch()

  useEffect(() => {
    if(!loading){
      setOpenNew(false)
      setOpenEdit(false)
      setOpenDelete(false)
    }
  }, [loading])

  const onOpenNew = useCallback(() => setOpenNew(true), [openNew])
  const onCloseNew = useCallback(() => setOpenNew(false), [openNew])

  const onOpenEdit = useCallback((item: TItemDto) => {
    setSelectedItem(item)
    setOpenEdit(true)
  }, [openEdit])

  const onOpenDelete = useCallback((item: TItemDto) => {
    setSelectedItem(item)
    setOpenDelete(true)
  }, [openDelete])

  const onCloseDelete = useCallback(() => setOpenDelete(false), [openDelete])

  const onCloseEdit = useCallback(() => setOpenEdit(false), [openEdit])

  const onSubmit = (form: TItemDto) => {
    setLoading(true)
    dispatch(upsertMonthToDateThunk(form)).then(() => setLoading(false))
  }

  const onEdit = (form: TItemDto) => {
    setLoading(true)
    dispatch(upsertMonthToDateThunk(form)).then(() => setLoading(false))
  }

  const onDelete = () => {
    setLoading(true)
    dispatch(deleteMonthToDateThunk(selectedItem)).then(() => setLoading(false))
  }

  return (
    <Layout>
      <Card style={styles.card} disabled>
        <Layout style={styles.main}>
          <Text>Status</Text>
          <Text>{status}</Text>
        </Layout>
      </Card>
      <Card style={styles.card} disabled>
        <Layout style={styles.main}>
          <Text>Total Month Revenue</Text>
          <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue)}</Text>
        </Layout>
        <Layout style={styles.main}>
          <Text>Total Month Expenses</Text>
          <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expenses)}</Text>
        </Layout>
        <Layout style={styles.main}>
          <Text>Total Month Savings</Text>
          <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(savings)}</Text>
        </Layout>
      </Card>
      <Card
        style={styles.card}
        disabled
        header={() => (
          <Layout style={styles.button}>
            <Button
              onPress={() => onOpenNew()}
              appearance={'ghost'}
              accessoryLeft={(props) => <Icon {...props} name={'plus-outline'} />}
            />
          </Layout>
        )}
      >
        <List
          style={{ maxHeight: Dimensions.get('window').height - 350}}
          data={items}
          renderItem={({ item, index }) => (
            <ListItem
              onPress={() => onOpenEdit(item)}
              title={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount)}
              description={item.itemName}
              accessoryLeft={(props) => (
                item.itemType === EXPENSE ? <Icon {...props} name={'arrow-circle-down'} /> : <Icon {...props} name={'arrow-circle-up'} />
              )}
              accessoryRight={() => (
                <Button
                  onPress={() => onOpenDelete(item)}
                  size={'small'}
                  appearance={'ghost'}
                  accessoryLeft={(props) => <Icon {...props} name={'trash-2-outline'} />}
                />
              )}
            />
          )}
        />
      </Card>
      <Layout>
        <MonthForm
          title={'New Expense Item'}
          onSubmit={onSubmit}
          open={openNew}
          loading={loading}
          onClose={() => onCloseNew()}
        />
      </Layout>
      <Layout>
        <MonthForm
          title={'Update Expense Item'}
          onSubmit={onEdit}
          open={openEdit}
          loading={loading}
          onClose={() => onCloseEdit()}
          initialValues={selectedItem}
        />
      </Layout>
      <Layout>
        <DeleteDialog
          open={openDelete}
          onDelete={() => onDelete()}
          onClose={() => onCloseDelete()}
          loading={loading}
        />
      </Layout>
    </Layout>
  )
}

export default connector(Month)
