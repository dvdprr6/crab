import React, { FC } from 'react'
import { Layout, Text, Modal, Button, Card } from '@ui-kitten/components'

const MonthForm: FC<{
  open: boolean
  onClose: () => void
}> = (props) => {
  const { open, onClose } = props

  return(
    <Layout level={'1'}>
      <Modal visible={open}>
        <Card disabled>
          <Text>Welcome to UI Kitten 😻</Text>
          <Button onPress={() => onClose()}>
            DISMISS
          </Button>
        </Card>
      </Modal>
    </Layout>
  )
}

export default MonthForm
