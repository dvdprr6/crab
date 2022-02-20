import React, { FC, useEffect } from 'react'
import { Layout, Text, Modal, Button, Card, Radio } from '@ui-kitten/components'
import { TMonthForm } from '@crab-models'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ViewProps, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { TextFieldControl, CheckBoxControl, RadioGroupControl } from '@crab-common-components'
import { ITEM_TYPES } from '@crab-utils'

const schema = yup.object().shape({
  itemName: yup.string().required('Is Required'),
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
  viewProps?: ViewProps
}> = (props) => {
  const { handleOnSubmit, onClose, viewProps } = props

  return(
    <Layout {...viewProps} style={styles.button}>
      <Button appearance={'ghost'} onPress={() => onClose()}>
        Cancel
      </Button>
      <Button appearance={'ghost'} onPress={handleOnSubmit}>
        Save
      </Button>
    </Layout>
  )
}

const MonthForm: FC<{
  title: string
  open: boolean
  onSubmit: (form: TMonthForm) => void
  onClose: () => void
  initialValues?: TMonthForm
}> = (props) => {
  const { title, open, onSubmit, onClose, initialValues } = props
  const { control, handleSubmit, reset, setValue } = useForm<TMonthForm>({ resolver: yupResolver(schema) })

  useEffect(() => {
    setValue('id', initialValues?.id)
  }, [initialValues])

  useEffect(() => {
    if(!open){
      reset() // clear form
    }
  }, [open])

  return(
    <Layout level={'1'}>
      <Modal visible={open} style={styles.container}>
        <Card
          header={(props) => <Header viewProps={props} title={title} />}
          footer={(props) => <Footer handleOnSubmit={handleSubmit(onSubmit)} onClose={onClose} viewProps={props} />}
          disabled
        >
          <Layout style={styles.form}>
            <Controller
              name={'itemName'}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <TextFieldControl
                  value={value}
                  onChange={onChange}
                  placeholder={'Item Expense Name'}
                  label={errors.itemName?.message}
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
                  value={value}
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
              name={'reocurring'}
              control={control}
              render={({ field: { value, onChange }}) => (
                <CheckBoxControl
                  value={value}
                  title={'Reocurring'}
                  onChange={onChange}
                />
              )}
            />
          </Layout>
          <Layout style={styles.form}>
            <Controller
              name={'itemType'}
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

export default MonthForm
