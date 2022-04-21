import React, { FC, useEffect } from 'react'
import { Layout, Text, Modal, Button, Card, Spinner, Radio } from '@ui-kitten/components'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ViewProps, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { CheckBoxControl, RadioGroupControl, TextFieldControl } from '@crab-common-components'
import { TItemForm } from '@crab-models'
import { ITEM_TYPES } from '@crab-utils'

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

const ItemForm: FC<{
  open: boolean
  onSubmit: (from: TItemForm) => void
  onClose: () => void
  loading: boolean
  initialValues: TItemForm
}> = (props) => {
  const { open, onSubmit, onClose, loading, initialValues } = props
  const { control, handleSubmit, reset, setValue } = useForm<TItemForm>({ resolver: yupResolver(schema) })

  useEffect(() => {
    setValue('id', initialValues.id)
    setValue('createDate', initialValues.createDate)
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
          header={(props) => <Header viewProps={props} title={'Edit Transaction'} />}
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
                  placeholder={'Item Expense Name'}
                  label={errors.name?.message}
                />
              )}
            />
          </Layout>
          <Layout style={styles.form}>
            <Controller
              name={'amount'}
              defaultValue={initialValues?.amount}
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
              name={'recurring'}
              defaultValue={initialValues?.recurring || false}
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
              defaultValue={initialValues?.type || ITEM_TYPES[0]}
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

export default ItemForm
