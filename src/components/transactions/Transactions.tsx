import React, { FC } from 'react'
import { Layout, Text, Card, List, Button, Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { TItemDto } from '@crab-models'

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  card: {
    margin: 4
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const Transactions: FC<{ items: TItemDto[] }> = (props) => {
  const { items } = props

  return(
    <Layout style={{ flex: 1 }}>
      <Text>This is transaction</Text>
    </Layout>
  )
}

export default Transactions
