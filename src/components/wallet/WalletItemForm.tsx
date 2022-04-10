import React, { FC, useEffect } from 'react'
import { Layout, Text, Modal, Button, Card, Spinner, Radio } from "@ui-kitten/components";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ViewProps, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { CheckBoxControl, RadioGroupControl, TextFieldControl } from "@crab-common-components";
import { TWalletItemForm, TWalletDto } from '@crab-models'
import { WalletSelectAutoCompleteControl } from './control'
import { ITEM_TYPES } from "@crab-utils";

const schema = yup.object().shape({
  name: yup.string().required('Is Required'),
  amount: yup.number().test(
    'maxDigitsAfterDecimal',
    'Number field must have 2 digits after decimal or less',
    (number) => /^\d+(\.\d{1,2})?$/.test(String(number))
  )
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

const WalletItemForm: FC<{
  open: boolean
  wallets: TWalletDto[]
  onSubmit: (form: TWalletItemForm) => void
  onClose: () => void
  loading: boolean
}> = (props) => {
  const { open, wallets, onSubmit, onClose, loading } = props
  const { control, handleSubmit, reset } = useForm<TWalletItemForm>({ resolver: yupResolver(schema) })

  useEffect(() => {
    if(!open){
      reset()
    }
  }, [open])

  return(
    <Layout level={'1'}>
      <Modal visible={open} style={styles.container}>
        <Card
          header={(props) => <Header viewProps={props} title={'New Item'} />}
          footer={(props) => <Footer loading={loading} handleOnSubmit={handleSubmit(onSubmit)} onClose={onClose} viewProps={props} />}
          disabled
        >
          <Layout style={styles.form}>
            <Controller
              name={'name'}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <TextFieldControl
                  value={value}
                  onChange={onChange}
                  placeholder={'Item Name'}
                  label={errors.name?.message}
                />
              )}
            />
          </Layout>
          <Layout style={styles.form}>
            <Controller
              name={'amount'}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <TextFieldControl
                  value={value?.toString()}
                  onChange={onChange}
                  placeholder={'Amount ($)'}
                  keyboardType={'numeric'}
                  label={errors.amount?.message}
                />
              )}
            />
          </Layout>
          <Layout style={styles.form}>
            <Controller
              name={'wallet'}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <WalletSelectAutoCompleteControl
                  value={value}
                  wallets={wallets}
                  onChange={onChange}
                />
              )}
            />
          </Layout>
          <Layout style={styles.form}>
            <Controller
              name={'recurring'}
              defaultValue={false}
              control={control}
              render={({ field: { value, onChange }}) => (
                <CheckBoxControl
                  value={value}
                  title={'Recurring'}
                  onChange={onChange}
                />
              )}
            />
          </Layout>
          <Layout style={styles.form}>
            <Controller
              name={'type'}
              defaultValue={ITEM_TYPES[0]}
              control={control}
              render={({ field: { value, onChange }}) => (
                <RadioGroupControl
                  value={value}
                  title={'Item Types'}
                  options={ITEM_TYPES}
                  onChange={onChange}
                >
                  {ITEM_TYPES.map((item, index) => (
                    <Radio key={index}>{item}</Radio>
                  ))}
                </RadioGroupControl>
              )}
            />
          </Layout>
        </Card>
      </Modal>
    </Layout>
  )
}

export default WalletItemForm
