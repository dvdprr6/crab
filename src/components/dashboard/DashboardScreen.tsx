import React from 'react'
import { Layout } from '@ui-kitten/components'
import Dashboard from './Dashboard'
import { AppBar } from '@crab-common-components'

const DashboardScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <AppBar />
      <Dashboard />
    </Layout>
  )
}

export default DashboardScreen
