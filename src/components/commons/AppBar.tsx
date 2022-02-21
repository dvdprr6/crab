import React from 'react'
import {
  Text,
  TopNavigation
} from '@ui-kitten/components'

const AppBar = () => {
  return (
      <TopNavigation title={() => <Text status={'info'}>Crab</Text>} />
  )
}

export default AppBar
