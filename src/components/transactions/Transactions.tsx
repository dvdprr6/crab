import React, { FC } from 'react'
import { Layout, Text, Card, List, Button, Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { TItemDetailsDto} from '@crab-models'
import { currencyNumberFormat, EXPENSE } from '@crab-utils'
import moment from 'moment'

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

const Transactions: FC<{ itemsDetails: TItemDetailsDto}> = (props) => {
  const { itemsDetails } = props

  return(
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <List
          data={itemsDetails.items}
          renderItem={renderItemProps => (
            <Layout>
              <Card
                disabled
                key={renderItemProps.item.id}
                style={styles.card}
                status={renderItemProps.item.type === EXPENSE ? 'danger' : 'success'}
                header={headerProps => (
                  <Layout {...headerProps} style={styles.button}>
                    <Button
                      onPress={() => undefined}
                      size={'small'}
                      appearance={'ghost'}
                      accessoryLeft={(props) => <Icon {...props} name={'trash-2-outline'} />}
                    />
                  </Layout>
                )}
              >
                <Layout style={styles.main}>
                  <Text>Item Name</Text>
                  <Text>{renderItemProps.item.name}</Text>
                </Layout>
                <Layout style={styles.main}>
                  <Text>Amount</Text>
                  <Text>{currencyNumberFormat(renderItemProps.item.amount)}</Text>
                </Layout>
                <Layout style={styles.main}>
                  <Text>Date</Text>
                  <Text>{moment(renderItemProps.item.createDate).format('LLL')}</Text>
                </Layout>
                <Layout style={styles.main}>
                  <Text>Type</Text>
                  <Text>{renderItemProps.item.type}</Text>
                </Layout>
              </Card>
            </Layout>
          )}
        />
      </Layout>
    </Layout>
  )
}

export default Transactions
