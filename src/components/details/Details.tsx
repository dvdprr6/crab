import React from 'react'
import { Text, Layout, Card, List, ListItem } from '@ui-kitten/components'
import { PieChart } from 'react-native-chart-kit'
import { StyleSheet, Dimensions } from 'react-native'

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

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: '#d84e4b',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#ffbc2c',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  }
]

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

const dataYee = new Array(100).fill({
  title: 'Title for Item',
  main: 'Description for Item'
})

const Details = () => {
  return (
    <Layout>
      <Card style={styles.card} disabled>
        <Layout style={styles.status}>
          <Text>Status</Text>
          <Text>Green</Text>
        </Layout>
      </Card>
      <Card style={styles.card} disabled>
        <Layout style={styles.total}>
          <Text>Total Spending</Text>
          <Text>$1000</Text>
        </Layout>
        <Layout style={styles.total}>
          <Text>Total Savings</Text>
          <Text>$1000</Text>
        </Layout>
      </Card>
      <Card style={styles.card} disabled>
        <PieChart
          data={data}
          width={Dimensions.get('window').width}
          height={200}
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
          data={dataYee}
          renderItem={({ item, index }) => (
            <ListItem
              title={`${item.title} ${index + 1}`}
              description={`${item.description} ${index + 1}`}
            />
          )}
        />
      </Card>
    </Layout>
  )
}

export default Details
