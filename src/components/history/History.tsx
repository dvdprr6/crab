import React, { FC } from 'react'
import { Text, List, Card, Layout } from '@ui-kitten/components'
import { StyleSheet, Dimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { TScreenProps, DETAILS_SCREEN } from '../types'
import { TPropsFromRedux, connector } from '@crab-reducers'
import { useHistory } from './hooks'

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
  listContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  item: {
    marginVertical: 4
  }
})

const History: FC<TScreenProps & TPropsFromRedux> = (props) => {
  const { yearToDateItems, navigation } = props
  const historyInfo = useHistory(yearToDateItems)

  return (
    <Layout style={{ flex: 1 }}>
      <List
        contentContainerStyle={styles.listContainer}
        data={historyInfo}
        renderItem={props => (
          <Card
            onPress={() => navigation.navigate(DETAILS_SCREEN, {
              status: props.item.status,
              revenue: props.item.revenue,
              expenses: props.item.expenses,
              savings: props.item.savings,
              chartData: props.item.chartData,
              items: props.item.items
            })}
            style={styles.item}
            header={headerProps => (
              <Layout {...headerProps}>
                <Text category='h6'>
                  {props.item.month}
                </Text>
              </Layout>
            )}>
            <PieChart
              data={props.item.chartData}
              width={Dimensions.get('window').width}
              height={100}
              chartConfig={chartConfig}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'0'}
              center={[10, 10]}
            />
          </Card>
        )}
      />
    </Layout>
  )
}

export default connector(History)
