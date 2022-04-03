import React from 'react'
import { Layout, Spinner } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const LoadingSpinner = () => {
  return (
    <Layout style={styles.spinner}>
      <Spinner size={'giant'} />
    </Layout>
  )
}

export default LoadingSpinner
