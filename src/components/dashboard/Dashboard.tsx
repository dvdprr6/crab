import React, { FC, useEffect } from 'react'
import { Layout, Text, Card, List } from '@ui-kitten/components'
import { PieChart } from 'react-native-chart-kit'
import { StyleSheet, Dimensions } from 'react-native'
import { TScreenProps } from '../types'
import { TPropsFromRedux, connector } from '@crab-reducers'
import { useDashboard } from './hooks'

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 1000
  },
  contentContainer: {
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
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  highestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

const Dashboard: FC<TScreenProps & TPropsFromRedux> = (props) => {
  const { yearToDateItems: { value: itemDto }, navigation } = props
  const { status, revenue, expenses, savings, chartData, topThreeExpense } = useDashboard(itemDto)

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault() // prevent leaving the screen
    })
  }, [navigation])

  return(
    <Layout>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={[0]}
        renderItem={() => (
          <Layout>
            <Card style={styles.card} disabled>
              <Layout style={styles.status}>
                <Text>Status</Text>
                <Text>{status}</Text>
              </Layout>
            </Card>
            <Card style={styles.card} disabled>
              <Layout style={styles.total}>
                <Text>Total Revenue</Text>
                <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(revenue)}</Text>
              </Layout>
              <Layout style={styles.total}>
                <Text>Total Expenses</Text>
                <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(expenses)}</Text>
              </Layout>
              <Layout style={styles.total}>
                <Text>Total Savings</Text>
                <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(savings)}</Text>
              </Layout>
            </Card>
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
                height={200}
                chartConfig={chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                center={[10, 10]}
              />
            </Card>
            <Card
              style={styles.card}
              disabled
              header={headerProps => (
                <Layout {...headerProps}>
                  <Text>Top Three Expensive items</Text>
                </Layout>
              )}
            >
              {topThreeExpense.map((item, index) => (
                <Layout key={index} style={styles.highestItem}>
                  <Text>{item}</Text>
                </Layout>
              ))}
            </Card>
          </Layout>
        )}
      />
    </Layout>
  )
}

export default connector(Dashboard)
