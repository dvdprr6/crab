import React from 'react'
import { Layout } from '@ui-kitten/components'
import { AppBar } from '@crab-common-components'
import Wallet from './Wallet'

const WalletScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <AppBar />
      <Wallet />
    </Layout>
  )
}

export default WalletScreen
