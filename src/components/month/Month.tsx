import React, { FC, useCallback, useEffect, useState } from 'react'
import { Text, Layout, Card, Button, List, Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { TItemDto } from '@crab-models'
import { EXPENSE } from '@crab-utils'
import moment from 'moment'
import { TPropsFromRedux, connector, TAppDispatch, upsertMonthToDateThunk, deleteMonthToDateThunk } from '@crab-reducers'
import { useMonth } from './hooks'
import { useDispatch } from 'react-redux'
import MonthForm from './MonthForm'
import { DeleteDialog } from '@crab-common-components'

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  card: {
    margin: 2
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
  const { monthToDateItems } = props
  const { status, month, revenue, expenses, savings, items } = useMonth(monthToDateItems)
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

  return(
    <Layout style={{ flex: 1 }}>
      <Layout>
        <List
          contentContainerStyle={styles.listContainer}
          data={[0]}
          renderItem={() => (
            <Layout>
              <Card style={styles.card} disabled>
                <Layout style={styles.status}>
                  <Text>Status</Text>
                  <Text>{status}</Text>
                </Layout>
              </Card>
            </Layout>
          )}
        />
      </Layout>
      <Layout>
        <List
          contentContainerStyle={styles.listContainer}
          data={[0]}
          renderItem={() => (
            <Layout>
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
            </Layout>
          )}
        />
      </Layout>
      <Layout>
        <List
          contentContainerStyle={styles.listContainer}
          data={[0]}
          renderItem={() => (
            <Layout>
              <Card
                style={styles.card}
                disabled
                footer={() => (
                  <Layout style={styles.button}>
                    <Button
                      onPress={() => onOpenNew()}
                      appearance={'ghost'}
                      accessoryLeft={(props) => <Icon {...props} name={'plus-outline'} />}
                    />
                  </Layout>
                )}
              >
                <Layout style={styles.main}>
                  <Text>Month</Text>
                  <Text>{month}</Text>
                </Layout>
              </Card>
            </Layout>
          )}
        />
      </Layout>
      <Layout style={{ flex: 1}}>
        <List
          contentContainerStyle={styles.listContainer}
          data={[0]}
          renderItem={() => (
            <Layout>
              {items.map(item => (
                <Card
                  onPress={() => onOpenEdit(item)}
                  key={item.id}
                  style={styles.card}
                  status={item.type === EXPENSE ? 'danger' : 'success'}
                  header={headerProps => (
                    <Layout {...headerProps} style={styles.button}>
                      <Button
                        onPress={() => onOpenDelete(item)}
                        size={'small'}
                        appearance={'ghost'}
                        accessoryLeft={(props) => <Icon {...props} name={'trash-2-outline'} />}
                      />
                    </Layout>
                  )}
                >
                  <Layout style={styles.main}>
                    <Text>Item Name</Text>
                    <Text>{item.name}</Text>
                  </Layout>
                  <Layout style={styles.main}>
                    <Text>Amount</Text>
                    <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount)}</Text>
                  </Layout>
                  <Layout style={styles.main}>
                    <Text>Date</Text>
                    <Text>{moment(item.createDate).format('LLL')}</Text>
                  </Layout>
                  <Layout style={styles.main}>
                    <Text>Type</Text>
                    <Text>{item.type}</Text>
                  </Layout>
                  <Layout style={styles.main}>
                    <Text>Is Re-occurring?</Text>
                    <Text>{item.recurring ? 'Yes' : 'No'}</Text>
                  </Layout>
                </Card>
              ))}
            </Layout>
          )}
        />
      </Layout>
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
