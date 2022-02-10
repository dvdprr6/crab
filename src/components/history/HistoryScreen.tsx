import React from 'react'
import { Layout } from '@ui-kitten/components'
import History from './History'
import { AppBar } from '@crab-common-components'

const HistoryScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <AppBar />
      <History />
    </Layout>
  )
}

export default HistoryScreen
