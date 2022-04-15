import React, { FC, useEffect } from 'react'
import { TScreenProps, MAIN_SCREEN } from '../types'
import { TAppDispatch } from '@crab-reducers'
import { useDispatch } from 'react-redux'
import { StyleSheet } from 'react-native'
import { Layout, Text, Spinner } from '@ui-kitten/components'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const Splash: FC<TScreenProps> = (props) => {
  const { navigation } = props
  const dispatch: TAppDispatch = useDispatch()

  useEffect(() => {
    //dispatch(splashThunk()).then(() => navigation.navigate(MAIN_SCREEN))
    navigation.navigate(MAIN_SCREEN)
  }, [])

  return(
    <Layout style={styles.container}>
      <Layout style={styles.spinner}>
        <Text category={'h1'} status={'primary'}>{'Crab'}</Text>
        <Spinner size={'giant'} />
      </Layout>
    </Layout>
  )
}

export default Splash
