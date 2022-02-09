import React from 'react'
import { Text, List, Card, Layout } from '@ui-kitten/components'
import { StyleSheet, Dimensions } from 'react-native'
import { PieChart } from 'react-native-chart-kit'

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
}

const styles = StyleSheet.create({
  container: {
    maxHeight: Dimensions.get('window').height - 150
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4
  },
  item: {
    marginVertical: 4
  }
})

const chartData = [
  {
    name: "Seoul",
    population: 21500000,
    color: "#d84e4b",
    legendFontColor: "#7F7F7F",
    legendFontSize: 10
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#ffbc2c",
    legendFontColor: "#7F7F7F",
    legendFontSize: 10
  }
]

const data = new Array(8).fill({
  title: 'Item'
})

const History = () => {
  return (
    <Layout>
      <List
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={props => (
          <Card
            style={styles.item}
            header={headerProps => (
              <Layout {...headerProps}>
                <Text category='h6'>
                  {props.item.title} {props.index + 1}
                </Text>
              </Layout>
            )}>
            {/*<Text>*/}
            {/*  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's*/}
            {/*  standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make*/}
            {/*  a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,*/}
            {/*  remaining essentially unchanged.*/}
            {/*</Text>*/}
            <PieChart
              data={chartData}
              width={Dimensions.get("window").width}
              height={100}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 10]}
            />
          </Card>
        )}
      />
    </Layout>
  )
}

export default History
