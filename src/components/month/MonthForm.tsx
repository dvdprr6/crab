import React, { FC, useEffect } from 'react'
import { Layout, Text, Modal, Button, Card } from '@ui-kitten/components'
import { TMonthForm } from '@crab-models'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { ViewProps, StyleSheet, GestureResponderEvent } from 'react-native'
import { TextFieldControl, CheckBoxControl } from '@crab-common-components'

const schema = yup.object().shape({
  itemName: yup.string().required('Is Required'),
  itemCost: yup.string().required('Is Required')
})

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  form: {
    margin: 3
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
      <Modal visible={open}>
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
              name={'itemCost'}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <TextFieldControl
                  value={value}
                  onChange={onChange}
                  placeholder={'Item Expense Cost ($)'}
                  label={errors.itemCost?.message}
                />
              )}
            />
          </Layout>
          <Layout style={styles.form}>
            <Controller
              name={'reoccurring'}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <CheckBoxControl
                  value={value}
                  title={'Re-occurring'}
                  onChange={onChange}
                />
              )}
            />
          </Layout>
        </Card>
      </Modal>
    </Layout>
  )
}

export default MonthForm
