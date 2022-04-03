import React, { FC } from 'react'
import { Text, Layout, Card, List } from '@ui-kitten/components'
import { PieChart } from 'react-native-chart-kit'
import { StyleSheet, Dimensions } from 'react-native'
import { TScreenProps } from '../types'
import { EXPENSE } from '@crab-utils'
import moment from "moment";

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
}
const styles = StyleSheet.create({
  card: {
    margin: 2
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  monetary: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const Details: FC<TScreenProps> = (props) => {
  const { route } = props

  return (
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
                  <Text>{route.params?.status}</Text>
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
                  <Text>Total Month Revenue</Text>
                  <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(route.params?.revenue || 0)}</Text>
                </Layout>
                <Layout style={styles.monetary}>
                  <Text>Total Month Expenses</Text>
                  <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(route.params?.expenses || 0)}</Text>
                </Layout>
                <Layout style={styles.monetary}>
                  <Text>Total Month Savings</Text>
                  <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(route.params?.savings || 0)}</Text>
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
                <PieChart
                  data={route.params?.chartData || []}
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
          data={route.params?.items || []}
          renderItem={props => (
            <Layout>
              <Card
                disabled
                key={props.item.id}
                style={styles.card}
                status={props.item.itemType === EXPENSE ? 'danger' : 'success'}
              >
                <Layout style={styles.main}>
                  <Text>Item Name</Text>
                  <Text>{props.item.itemName}</Text>
                </Layout>
                <Layout style={styles.main}>
                  <Text>Amount</Text>
                  <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.item.amount)}</Text>
                </Layout>
                <Layout style={styles.main}>
                  <Text>Date</Text>
                  <Text>{moment(props.item.createDate).format('LLL')}</Text>
                </Layout>
                <Layout style={styles.main}>
                  <Text>Type</Text>
                  <Text>{props.item.itemType}</Text>
                </Layout>
                <Layout style={styles.main}>
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

export default Details
