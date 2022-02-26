import React, { useState, useCallback, FC, useEffect } from 'react'
import { Text, Layout, Card, Button, List, ListItem, Icon } from '@ui-kitten/components'
import { StyleSheet, Dimensions } from 'react-native'
import MonthForm from './MonthForm'
import { DeleteDialog } from '@crab-common-components'
import { TItemDto, TMonthForm } from '@crab-models'
import { TPropsFromRedux, connector, TAppDispatch, upsertMonthToDateThunk } from '@crab-reducers'
import { useMonth } from './hooks'
import { useDispatch } from 'react-redux'

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

  const onCloseEdit = useCallback(() => setOpenEdit(false), [openEdit])

  const onSubmit = (form: TItemDto) => {
    setLoading(true)
    dispatch(upsertMonthToDateThunk(form)).then(() => setLoading(false))
  }

  const onEdit = (form: TItemDto) => {
    setLoading(true)
    dispatch(upsertMonthToDateThunk(form)).then(() => setLoading(false))
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
          <Text>{revenue}</Text>
        </Layout>
        <Layout style={styles.main}>
          <Text>Total Month Expenses</Text>
          <Text>{expenses}</Text>
        </Layout>
        <Layout style={styles.main}>
          <Text>Total Month Savings</Text>
          <Text>{savings}</Text>
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
              title={`${item.itemName}`}
              description={`${item.itemType}`}
              // accessoryRight={() => (
              //   <Button
              //     onPress={() => setOpenDialog(true)}
              //     size={'small'}
              //     appearance={'ghost'}
              //     accessoryLeft={(props) => <Icon {...props} name={'trash-2-outline'} />}
              //   />
              // )}
            />
          )}
        />
      </Card>
      <Layout>
        <MonthForm
          title={'New Expense Item'}
          onSubmit={onSubmit}
          open={openNew}
          onClose={() => onCloseNew()}
        />
      </Layout>
      <Layout>
        <MonthForm
          title={'Update Expense Item'}
          onSubmit={onEdit}
          open={openEdit}
          onClose={() => onCloseEdit()}
        />
      </Layout>
      <Layout>
        {/*<DeleteDialog*/}
        {/*  open={openDialog}*/}
        {/*  onDelete={onDelete}*/}
        {/*  onClose={onCloseDialog}*/}
        {/*/>*/}
      </Layout>
    </Layout>
  )
}

export default connector(Month)
