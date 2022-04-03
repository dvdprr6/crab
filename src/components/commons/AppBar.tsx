import React, { FC } from 'react'
import {
  Text,
  TopNavigation
} from '@ui-kitten/components'
import { TAppBar } from '@crab-models'

const AppBar: FC<TAppBar> = (props) => {
  const { accessoryLeft, accessoryRight } = props

  return (
    <TopNavigation
      title={() => <Text status={'info'}>Crab</Text>}
      accessoryLeft={accessoryLeft}
      accessoryRight={accessoryRight}
    />
  )
}

export default AppBar
