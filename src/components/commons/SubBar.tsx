import React, { FC } from 'react'
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { TScreenProps } from '../types'
import { TSubBar } from '@crab-models'

const SubBar: FC<TScreenProps & TSubBar> = (props) => {
  const { navigation, accessoryRight } = props

  return(
    <TopNavigation
      accessoryLeft={() => (
        <TopNavigationAction
          onPress={() => navigation.goBack()}
          icon={props => <Icon {...props}  name={'arrow-back'} />}
        />
      )}
      accessoryRight={accessoryRight}
    />
  )
}

export default SubBar
