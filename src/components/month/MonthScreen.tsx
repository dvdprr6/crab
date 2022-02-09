import React from 'react'
import { Layout } from '@ui-kitten/components'
import Month from './Month'
import { AppBar } from '@crap-common-components'

const MonthScreen = () => {
  return (
    <Layout style={{ flex: 1}}>
      <AppBar />
      <Month />
    </Layout>
  )
}

export default MonthScreen
