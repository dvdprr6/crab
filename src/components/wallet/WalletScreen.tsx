import React, { FC, useState, useCallback } from 'react'
import { Layout, TopNavigationAction } from '@ui-kitten/components'
import { AppBar } from '@crab-common-components'
import Wallet from './Wallet'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TScreenNavigationProps, TScreenRouteProps } from '../types'
import { Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import { TPropsFromRedux, connector, TAppDispatch, createWalletThunk } from '@crab-reducers'
import { useDispatch } from 'react-redux'
import WalletForm from './WalletForm'
import { TWalletForm } from '@crab-models'

const styles = StyleSheet.create({
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

const WalletScreen: FC<TPropsFromRedux> = (props) => {
  const { walletDetails } = props
  const [newWallet, setNewWallet] = useState<boolean>(false)
  const [newTransaction, setNewTransaction] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const navigation = useNavigation<TScreenNavigationProps>()
  const route = useRoute<TScreenRouteProps>()
  const dispatch: TAppDispatch = useDispatch()

  const onOpenNewWallet = useCallback(() => setNewWallet(true), [newWallet])
  const onOpenCloseWallet = useCallback(() => setNewWallet(false), [newWallet])

  const onOpenNewTransaction = useCallback(() => setNewTransaction(true), [newTransaction])
  const onOpenCloseTransaction = useCallback(() => setNewTransaction(false), [newTransaction])

  const onSubmitWallet = (form: TWalletForm) => {
    setLoading(true)

    dispatch(createWalletThunk(form)).then(() => setLoading(false))
  }

  return (
    <Layout style={{ flex: 1 }}>
      <Layout style={{ flex: 1 }}>
        <AppBar
          accessoryRight={() => (
            <Layout style={styles.iconGroup}>
              <TopNavigationAction
                onPress={() => onOpenNewWallet()}
                icon={props => <Icon {...props} name={'plus-circle-outline'} />}
              />
              <TopNavigationAction
                icon={props => <Icon {...props} name={'plus-square-outline'} />}
              />
            </Layout>
          )}
        />
        <Wallet
          navigation={navigation}
          route={route}
          walletDetails={walletDetails}
          newWallet={newWallet}
          onOpenNewWallet={onOpenNewWallet}
        />
      </Layout>
      <Layout>
        <WalletForm
          title={'New Wallet'}
          open={newWallet}
          onSubmit={onSubmitWallet}
          onClose={onOpenCloseWallet}
          loading={loading}
        />
      </Layout>
    </Layout>
  )
}

export default connector(WalletScreen)
