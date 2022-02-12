import React, { FC } from 'react'
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { TScreenProps } from '../types'

const SubBar: FC<TScreenProps> = (props) => {
  const { navigation } = props

  return(
    <TopNavigation
      accessoryLeft={() => (
        <TopNavigationAction
          onPress={() => navigation.goBack()}
          icon={props => <Icon {...props}  name={'arrow-back'} />}
        />
      )}
    />
  )
}

export default SubBar
