import React, { FC } from 'react'
import { Layout, Text, Card, List, Button, Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { TScreenProps, TRANSACTION_SCREEN } from '../types'
import { TWalletDetailsDto, TWalletDto } from '@crab-models'
import { currencyNumberFormat, UNASSIGNED_WALLET } from '@crab-utils'

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
  walletDetails: TWalletDetailsDto[]
  onSelectedWalletForEdit: (walletDetails: TWalletDto) => void
  onSelectedWalletForDelete: (walletDetails: TWalletDto) => void
}> = (props) => {
  const { navigation, walletDetails, onSelectedWalletForEdit, onSelectedWalletForDelete } = props

  return(
    <Layout style={{ flex: 1 }}>
      <List
        data={walletDetails}
        renderItem={value => (
          <Card
            onPress={() => navigation.navigate(TRANSACTION_SCREEN, { walletId: value.item.id })}
            style={styles.card}
            header={headerProps => (
              <Layout {...headerProps}>
                <Layout style={styles.main}>
                  <Text category={'h6'}>{value.item.name}</Text>
                  {value.item.name === UNASSIGNED_WALLET ? (<Layout></Layout>) : (
                    <Layout style={styles.buttonGroup}>
                      <Button
                        onPress={() => onSelectedWalletForEdit({ id: value.item.id, name: value.item.name, createDate: value.item.createDate })}
                        size={'small'}
                        appearance={'ghost'}
                        accessoryLeft={(props) => <Icon {...props} name={'edit-outline'} />}
                      />
                      <Button
                        onPress={() => onSelectedWalletForDelete({ id: value.item.id, name: value.item.name, createDate: value.item.createDate })}
                        size={'small'}
                        appearance={'ghost'}
                        accessoryLeft={(props) => <Icon {...props} name={'trash-2-outline'} />}
                      />
                    </Layout>
                  )}
                </Layout>
              </Layout>
            )}
          >
            <Layout style={styles.main}>
              <Text>Total Revenue</Text>
              <Text>{currencyNumberFormat(value.item.totalRevenue)}</Text>
            </Layout>
            <Layout style={styles.main}>
              <Text>Total Expenses</Text>
              <Text>{currencyNumberFormat(value.item.totalExpense)}</Text>
            </Layout>
            <Layout style={styles.main}>
              <Text>Total Savings</Text>
              <Text>{currencyNumberFormat(value.item.totalSavings)}</Text>
            </Layout>
          </Card>
        )}
      />
    </Layout>
  )
}

export default Wallet
