import React, { FC } from 'react'
import { Layout, Text, Card, List, Button, Icon } from "@ui-kitten/components";
import { StyleSheet } from 'react-native'
import { TScreenProps } from '../types'
import { TWalletDetailsDto } from '@crab-models'
import { currencyNumberFormat } from '@crab-utils'

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

const Wallet: FC<TScreenProps & {
  walletDetails: TWalletDetailsDto[],
  newWallet: boolean,
  onOpenNewWallet: () => void
}> = (props) => {
  const { navigation, route, walletDetails } = props

  return(
    <Layout style={{ flex: 1 }}>
      <List
        data={walletDetails}
        renderItem={props => (
          <Card
            style={styles.card}
            header={headerProps => (
              <Layout {...headerProps}>
                <Layout style={styles.main}>
                  <Text category={'h6'}>
                    {props.item.name}
                  </Text>
                  <Layout style={styles.buttonGroup}>
                    <Button
                      onPress={() => undefined}
                      size={'small'}
                      appearance={'ghost'}
                      accessoryLeft={(props) => <Icon {...props} name={'edit-outline'} />}
                    />
                    <Button
                      onPress={() => undefined}
                      size={'small'}
                      appearance={'ghost'}
                      accessoryLeft={(props) => <Icon {...props} name={'trash-2-outline'} />}
                    />
                  </Layout>
                </Layout>
              </Layout>
            )}
          >
            <Layout style={styles.main}>
              <Text>Total Revenue</Text>
              <Text>{currencyNumberFormat(props.item.totalRevenue)}</Text>
            </Layout>
            <Layout style={styles.main}>
              <Text>Total Expenses</Text>
              <Text>{currencyNumberFormat(props.item.totalExpense)}</Text>
            </Layout>
            <Layout style={styles.main}>
              <Text>Total Savings</Text>
              <Text>{currencyNumberFormat(props.item.totalSavings)}</Text>
            </Layout>
          </Card>
        )}
      />
    </Layout>
  )
}

export default Wallet
