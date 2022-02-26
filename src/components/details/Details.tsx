import React, { FC } from 'react'
import { Text, Layout, Card, List, ListItem, Icon } from '@ui-kitten/components'
import { PieChart } from 'react-native-chart-kit'
import { StyleSheet, Dimensions } from 'react-native'
import { TScreenProps } from '../types'
import { EXPENSE } from '@crab-utils'

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
  status: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  highestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const Details: FC<TScreenProps> = (props) => {
  const { route } = props

  return (
    <Layout>
      <Card style={styles.card} disabled>
        <Layout style={styles.status}>
          <Text>Status</Text>
          <Text>{route.params?.status}</Text>
        </Layout>
      </Card>
      <Card style={styles.card} disabled>
        <Layout style={styles.total}>
          <Text>Total Month Revenue</Text>
          <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(route.params?.revenue || 0)}</Text>
        </Layout>
        <Layout style={styles.total}>
          <Text>Total Month Expenses</Text>
          <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(route.params?.expenses || 0)}</Text>
        </Layout>
        <Layout style={styles.total}>
          <Text>Total Month Savings</Text>
          <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(route.params?.savings || 0)}</Text>
        </Layout>
      </Card>
      <Card style={styles.card} disabled>
        <PieChart
          data={route.params?.chartData || []}
          width={Dimensions.get('window').width}
          height={100}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 10]}
        />
      </Card>
      <Card style={styles.card} disabled>
        <List
          style={{ maxHeight: Dimensions.get('window').height - 450}}
          data={route.params?.items || []}
          renderItem={({ item, index }) => (
            <ListItem
              title={new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.amount)}
              description={item.itemName}
              accessoryLeft={(props) => (
                item.itemType === EXPENSE ? <Icon {...props} name={'arrow-circle-down'} /> : <Icon {...props} name={'arrow-circle-up'} />
              )}
            />
          )}
        />
      </Card>
    </Layout>
  )
}

export default Details
