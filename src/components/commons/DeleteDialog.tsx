import React, { FC } from 'react'
import { Layout, Text, Modal, Button, Card } from '@ui-kitten/components'

const DeleteDialog: FC<{
  open: boolean
  onClose: () => void
}> = (props) => {
  const { open, onClose } = props

  return(
    <Layout level={'1'}>
      <Modal visible={open}>
        <Card disabled>
          <Text>Are you sure you want to delete this record?</Text>
          <Button onPress={() => onClose()}>
            DISMISS
          </Button>
        </Card>
      </Modal>
    </Layout>
  )
}

export default DeleteDialog
