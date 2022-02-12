import React, { FC, useState, useCallback } from 'react'
import {
  Text,
  TopNavigation,
  Icon,
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
} from '@ui-kitten/components'
import { TScreenProps, SETTINGS_SCREEN } from '../types'

const AppBar: FC<TScreenProps> = (props) => {
  const { navigation } = props
  const [visible, setVisible] = useState<boolean>(false)

  const navigateToSettingsScreen = useCallback(() => {
    navigation.navigate(SETTINGS_SCREEN)
    setVisible(false)
  }, [visible])

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
            onSelect={() => navigateToSettingsScreen()}
            onBackdropPress={() => setVisible(false)}
          >
            <MenuItem title={'Settings'} />
          </OverflowMenu>
        )}
      />
  )
}

export default AppBar
