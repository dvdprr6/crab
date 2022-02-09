import React from 'react'
import { Text, Layout, Card, Button, List, ListItem } from '@ui-kitten/components'
import { Dimensions } from 'react-native'

const data = new Array(100).fill({
  title: 'Title for Item',
  description: 'Description for Item'
})

const Month = () => {
  // return <Text>This is Month</Text>
  return (
    <Layout>
      <Card style={{ margin: 2 }} disabled>
        <Text>
          Status: Green
        </Text>
        <Text>
          This Month Budget: 4884.02
        </Text>
        <Text>
          This Month Spending: 1000.00
        </Text>
      </Card>
      <Layout style={{ margin: 2 }}>
        <Button>Add</Button>
      </Layout>
      <Card style={{ margin: 2 }} disabled>
        <List
          style={{ maxHeight: Dimensions.get('window').height - 300}}
          data={data}
          renderItem={({ item, index }) => (
            <ListItem
              title={`${item.title} ${index + 1}`}
              description={`${item.description} ${index + 1}`}
              accessoryRight={(props) => <Button size={'tiny'}>Delete</Button>}
            />
          )}
        />
      </Card>
    </Layout>
  )
}

export default Month
