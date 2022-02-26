import React, { FC } from 'react'
import { Layout, Text, Modal, Button, Card, Spinner } from '@ui-kitten/components'
import { ViewProps, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

const Header: FC<{
  viewProps?: ViewProps
}> = (props) => {
  const { viewProps } = props

  return(
    <Layout {...viewProps}>
      <Text category={'h6'}>Delete Item</Text>
    </Layout>
  )
}

const Footer: FC<{
  onDelete: () => void
  onClose: () => void
  loading: boolean
  viewProps?: ViewProps
}> = (props) => {
  const { onDelete, onClose, loading, viewProps } = props

  return(
    <Layout {...viewProps} style={styles.button}>
      <Button disabled={loading} appearance={'ghost'} onPress={() => onClose()}>
        Close
      </Button>
      <Button disabled={loading} accessoryLeft={() => loading ? <Spinner size={'tiny'} /> : <></>} appearance={'ghost'} onPress={() => onDelete()}>
        Delete
      </Button>
    </Layout>
  )
}

const DeleteDialog: FC<{
  open: boolean
  onDelete: () => void
  onClose: () => void
  loading: boolean
}> = (props) => {
  const { open, onDelete, onClose, loading } = props

  return(
    <Layout level={'1'}>
      <Modal visible={open}>
        <Card
          header={(props) => <Header viewProps={props} />}
          footer={(props) => <Footer loading={loading} onDelete={onDelete} onClose={onClose} viewProps={props} />}
          disabled
        >
          <Text>Are you sure you want to delete this record?</Text>
        </Card>
      </Modal>
    </Layout>
  )
}

export default DeleteDialog
