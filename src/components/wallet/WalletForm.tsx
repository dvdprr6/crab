import React, { FC, useEffect } from 'react'
import { Layout, Text, Modal, Button, Card, Radio, Spinner } from '@ui-kitten/components'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ViewProps, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { TextFieldControl } from '@crab-common-components'
import { TWalletForm } from '@crab-models'

const schema = yup.object().shape({
  name: yup.string().required('Is Required')
})

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  form: {
    margin: 3
  },
  container: {
    width: Dimensions.get('window').width - 20
  }
})

const Header: FC<{
  title: string
  viewProps?: ViewProps
}> = (props) => {
  const { title, viewProps } = props

  return(
    <Layout {...viewProps}>
      <Text category={'h6'}>{title}</Text>
    </Layout>
  )
}

const Footer: FC<{
  handleOnSubmit: (event: GestureResponderEvent) => void
  onClose: () => void
  loading: boolean
  viewProps?: ViewProps
}> = (props) => {
  const { handleOnSubmit, onClose, loading, viewProps } = props

  return(
    <Layout {...viewProps} style={styles.button}>
      <Button disabled={loading} appearance={'ghost'} onPress={() => onClose()}>
        Cancel
      </Button>
      <Button disabled={loading} appearance={'ghost'} accessoryLeft={() => loading ? <Spinner size={'tiny'} /> : <></>} onPress={handleOnSubmit}>Save</Button>
    </Layout>
  )
}

const WalletForm: FC<{
  title: string
  open: boolean
  onSubmit: (form: TWalletForm) => void
  onClose: () => void
  loading: boolean
  initialValues?: TWalletForm
}> = (props) => {
  const { title, open, onSubmit, onClose, loading, initialValues } = props
  const { control, handleSubmit, reset, setValue } = useForm<TWalletForm>({ resolver: yupResolver(schema) })

  useEffect(() => {
    setValue('id', initialValues?.id)
    setValue('createDate', initialValues?.createDate)
  }, [initialValues])

  useEffect(() => {
    if(!open){
      reset()
    }
  }, [open])

  return(
    <Layout level={'1'}>
      <Modal visible={open} style={styles.container}>
        <Card
          header={(props) => <Header viewProps={props} title={title} />}
          footer={(props) => <Footer loading={loading} handleOnSubmit={handleSubmit(onSubmit)} onClose={onClose} viewProps={props} />}
          disabled
        >
          <Layout style={styles.form}>
            <Controller
              name={'name'}
              defaultValue={initialValues?.name}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <TextFieldControl
                  value={value}
                  onChange={onChange}
                  placeholder={'Wallet Name'}
                  label={errors.name?.message}
                />
              )}
            />
          </Layout>
        </Card>
      </Modal>
    </Layout>
  )
}

export default WalletForm
