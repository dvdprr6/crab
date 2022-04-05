import React, { FC, useState, useCallback, useEffect } from 'react'
import { Layout, TopNavigationAction } from '@ui-kitten/components'
import { AppBar } from '@crab-common-components'
import Wallet from './Wallet'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TScreenNavigationProps, TScreenRouteProps } from '../types'
import { Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import {
  TPropsFromRedux,
  connector,
  TAppDispatch,
  createWalletThunk,
  getAllWalletsDetailsThunk,
  updateWalletThunk,
  deleteWalletThunk,
} from '@crab-reducers'
import { useDispatch } from 'react-redux'
import WalletForm from './WalletForm'
import { TWalletDetailsDto, TWalletDto, TWalletForm } from '@crab-models'
import { LoadingSpinner, DeleteDialog } from '@crab-common-components'

const styles = StyleSheet.create({
  iconGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

const WalletScreen: FC<TPropsFromRedux> = (props) => {
  const { walletDetails } = props
  const [newWallet, setNewWallet] = useState<boolean>(false)
  const [editWallet, setEditWallet] = useState<boolean>(false)
  const [deleteWallet, setDeleteWallet] = useState<boolean>(false)
  const [newTransaction, setNewTransaction] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [screenLoading, setScreenLoading] = useState<boolean>(false)
  const [selectedWallet, setSelectedWallet] = useState<TWalletDto>({} as TWalletDto)
  const navigation = useNavigation<TScreenNavigationProps>()
  const route = useRoute<TScreenRouteProps>()
  const dispatch: TAppDispatch = useDispatch()

  const onOpenNewWallet = useCallback(() => setNewWallet(true), [newWallet])
  const onCloseNewWallet = useCallback(() => setNewWallet(false), [newWallet])

  const onCloseEditWallet = useCallback(() => setEditWallet(false), [editWallet])

  const onCloseDeleteWallet = useCallback(() => setDeleteWallet(false), [deleteWallet])

  const onOpenNewTransaction = useCallback(() => setNewTransaction(true), [newTransaction])
  const onOpenCloseTransaction = useCallback(() => setNewTransaction(false), [newTransaction])

  const onSubmitWallet = (form: TWalletForm) => {
    setLoading(true)

    dispatch(createWalletThunk(form)).then(() => {
      setLoading(false)
      setNewWallet(false)
    })
  }

  const onEditWallet = useCallback((form: TWalletForm) => {
    setLoading(true)

    dispatch(updateWalletThunk(form)).then(() => {
      setLoading(false)
      setEditWallet(false)
    })
  }, [selectedWallet])

  const onDeleteWallet = useCallback(() => {
    setLoading(true)

    dispatch(deleteWalletThunk(selectedWallet)).then(() => {
      setLoading(false)
      setDeleteWallet(false)
    })
  }, [selectedWallet])

  const onSelectedWalletForEdit = (walletDto: TWalletDto) => {
    setSelectedWallet(walletDto)
    setEditWallet(true)
  }

  const onSelectedWalletForDelete = (walletDto: TWalletDto) => {
    setSelectedWallet(walletDto)
    setDeleteWallet(true)
  }

  useEffect(() => {
    setScreenLoading(true)
    dispatch(getAllWalletsDetailsThunk()).then(() => setScreenLoading(false))
  }, [])

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
        {screenLoading ? (
          <LoadingSpinner />
        ) : (
          <Wallet
            navigation={navigation}
            route={route}
            walletDetails={walletDetails}
            onSelectedWalletForEdit={onSelectedWalletForEdit}
            onSelectedWalletForDelete={onSelectedWalletForDelete}
          />
        )}
      </Layout>
      <Layout>
        <WalletForm
          title={'New Wallet'}
          open={newWallet}
          onSubmit={onSubmitWallet}
          onClose={onCloseNewWallet}
          loading={loading}
        />
      </Layout>
      <Layout>
        <WalletForm
          title={'Edit Wallet'}
          open={editWallet}
          onSubmit={onEditWallet}
          onClose={onCloseEditWallet}
          loading={loading}
          initialValues={selectedWallet}
        />
      </Layout>
      <Layout>
        <DeleteDialog
          open={deleteWallet}
          onDelete={onDeleteWallet}
          onClose={onCloseDeleteWallet}
          loading={loading}
        />
      </Layout>
    </Layout>
  )
}

export default connector(WalletScreen)
