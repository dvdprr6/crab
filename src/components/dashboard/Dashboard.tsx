import React, { FC, useEffect } from 'react'
import { Layout, Text, Card } from '@ui-kitten/components'
import { PieChart } from 'react-native-chart-kit'
import { StyleSheet, Dimensions } from 'react-native'
import { TScreenProps } from '../types'

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

const Dashboard: FC<TScreenProps> = (props) => {
  const { navigation } = props

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault() // prevent leaving the screen
    })
  }, [navigation])

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
          height={300}
          chartConfig={chartConfig}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          center={[10, 10]}
        />
      </Card>
      <Card style={styles.card} disabled>
        <Layout style={styles.highestItem}>
          <Text>Highest Item</Text>
          <Text>Jordans at $225</Text>
        </Layout>
      </Card>
    </Layout>
  )
}

export default Dashboard
