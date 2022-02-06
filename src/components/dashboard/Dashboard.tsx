import React from 'react'
import { Layout, Text, Card } from '@ui-kitten/components'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};

const data = [
  {
    name: "Seoul",
    population: 21500000,
    color: "#d84e4b",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    name: "Toronto",
    population: 2800000,
    color: "#ffbc2c",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
  ];

const Dashboard = () => {
  return (
    <Layout>
      <Card style={{ margin: 2 }} disabled>
        <Text status={'danger'}>
          Status: Green
        </Text>
      </Card>
      <Card style={{ margin: 2 }} disabled>
        <Text status={'danger'}>
          Total Spending: $1000
        </Text>
        <Text status={'danger'}>
          Total Savings: $1000
        </Text>
      </Card>
      <Card style={{ margin: 2 }} disabled>
        <PieChart
          data={data}
          width={Dimensions.get("window").width}
          height={300}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[10, 10]}
        />
      </Card>
      <Card style={{ margin: 2 }} disabled>
        <Text status={'danger'}>Highest Item</Text>
        <Text status={'danger'}>Jordans at $225</Text>
      </Card>
    </Layout>
  )
}

export default Dashboard
