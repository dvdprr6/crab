import React, { FC, useState } from 'react'
import {
  Text,
  Layout,
  TopNavigation,
  Icon,
  TopNavigationAction,
  OverflowMenu,
  Menu,
  MenuItem,
} from '@ui-kitten/components'
import { TScreenProps } from '../types'

const AppBar: FC<TScreenProps> = (props) => {
  const { navigation } = props
  const [visible, setVisible] = useState<boolean>(false)

  return (
      <TopNavigation
        title={() => <Text status={'info'}>Crab</Text>}
        accessoryRight={() => (
          <OverflowMenu
            anchor={() => (
              <TopNavigationAction
                icon={props => <Icon {...props} name={'menu-outline'} />}
                onPress={() => setVisible(true)}
              />
            )}
            visible={visible}
            onSelect={() => setVisible(false)}
            onBackdropPress={() => setVisible(false)}
          >
            <MenuItem title={'Settings'} />
          </OverflowMenu>
        )}
      />
  )
}

export default AppBar
