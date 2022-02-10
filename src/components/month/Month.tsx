import React, { useState, useCallback } from 'react'
import { Text, Layout, Card, Button, List, ListItem, Icon } from '@ui-kitten/components'
import { StyleSheet, Dimensions, } from 'react-native'
import MonthForm from './MonthForm'
import { DeleteDialog } from '@crab-common-components'

const data = new Array(100).fill({
  title: 'Title for Item',
  main: 'Description for Item'
})

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

const Month = () => {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  const onCloseForm = useCallback(() => {
    setOpenForm(false)
  }, [openForm])

  const onCloseDialog = useCallback(() => {
    setOpenDialog(false)
  }, [openDialog])

  return (
    <Layout>
      <Card style={styles.card} disabled>
        <Layout style={styles.main}>
          <Text>Status</Text>
          <Text>Green</Text>
        </Layout>
        <Layout style={styles.main}>
          <Text>This Month Budget</Text>
          <Text>4884.02</Text>
        </Layout>
        <Layout style={styles.main}>
          <Text>This Month Spending</Text>
          <Text>1000.00</Text>
        </Layout>
      </Card>
      <Card
        style={styles.card}
        disabled
        header={() => (
          <Layout style={styles.button}>
            <Button
              onPress={() => setOpenForm(true)}
              appearance={'ghost'}
              accessoryLeft={(props) => <Icon {...props} name={'plus-outline'} />}
            />
          </Layout>
        )}
      >
        <List
          style={{ maxHeight: Dimensions.get('window').height - 300}}
          data={data}
          renderItem={({ item, index }) => (
            <ListItem
              title={`${item.title} ${index + 1}`}
              description={`${item.description} ${index + 1}`}
              accessoryRight={() => (
                <Button
                  onPress={() => setOpenDialog(true)}
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
          open={openForm}
          onClose={onCloseForm}
        />
      </Layout>
      <Layout>
        <DeleteDialog
          open={openDialog}
          onClose={onCloseDialog}
        />
      </Layout>
    </Layout>
  )
}

export default Month
