import React, { FC, useEffect } from 'react'
import { Layout, Text, Card, List, Divider } from '@ui-kitten/components'
import { PieChart } from 'react-native-chart-kit'
import { StyleSheet, Dimensions } from 'react-native'
import { TScreenProps } from '../types'
import { TPropsFromRedux, connector } from '@crab-reducers'
import { useDashboard } from './hooks'
import moment from "moment";

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}

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
  monetary: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  highestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const Dashboard: FC<TScreenProps & TPropsFromRedux> = (props) => {
  const { itemsAll, navigation } = props
  const { status, revenue, expenses, savings, chartData, topThreeExpense } = useDashboard(itemsAll)

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault() // prevent leaving the screen
    })
  }, [navigation])

  return(
    <Layout style={{ flex: 1 }}>
      <Layout>
        <List
          contentContainerStyle={styles.listContainer}
          data={[0]}
          renderItem={() =>(
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
                <Layout style={styles.monetary}>
                  <Text>Total Revenue</Text>
                  <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue)}</Text>
                </Layout>
                <Layout style={styles.monetary}>
                  <Text>Total Expenses</Text>
                  <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expenses)}</Text>
                </Layout>
                <Layout style={styles.monetary}>
                  <Text>Total Savings</Text>
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
                header={headerProps => (
                  <Layout {...headerProps}>
                    <Text>Yearly Allocation</Text>
                  </Layout>
                )}
              >
                <PieChart
                  data={chartData}
                  width={Dimensions.get('window').width}
                  height={100}
                  chartConfig={chartConfig}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  paddingLeft={'0'}
                  center={[10, 10]}
                />
              </Card>
            </Layout>
          )}
        />
      </Layout>
      <Layout style={{ flex: 1 }}>
        <List
          contentContainerStyle={styles.listContainer}
          data={topThreeExpense}
          ItemSeparatorComponent={Divider}
          renderItem={(props) => (
            <Layout>
              <Card
                disabled
                key={props.item.id}
                style={styles.card}
                status={'danger'}
              >
                <Layout style={styles.highestItem}>
                  <Text>Item Name</Text>
                  <Text>{props.item.name}</Text>
                </Layout>
                <Layout style={styles.highestItem}>
                  <Text>Amount</Text>
                  <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.item.amount)}</Text>
                </Layout>
                <Layout style={styles.highestItem}>
                  <Text>Date</Text>
                  <Text>{moment(props.item.createDate).format('LLL')}</Text>
                </Layout>
                <Layout style={styles.highestItem}>
                  <Text>Type</Text>
                  <Text>{props.item.type}</Text>
                </Layout>
                <Layout style={styles.highestItem}>
                  <Text>Is Re-occurring?</Text>
                  <Text>{props.item.recurring ? 'Yes' : 'No'}</Text>
                </Layout>
              </Card>
            </Layout>
          )}
        />
      </Layout>
    </Layout>
  )
}

export default connector(Dashboard)
