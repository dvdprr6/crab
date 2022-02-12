import React, { FC, useEffect } from 'react'
import { Layout, Text, Modal, Button, Card } from '@ui-kitten/components'
import { useForm, Controller } from 'react-hook-form'
import { ViewProps, StyleSheet, GestureResponderEvent } from 'react-native'
import { TextFieldControl } from '@crab-common-components'
import { TBudgeForm } from '@crab-models'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  budget: yup.number().required('Is Required')
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
  viewProps?: ViewProps
}> = (props) => {
  const { viewProps } = props

  return(
    <Layout {...viewProps}>
      <Text category={'h6'}>Set Budget</Text>
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

const BudgetForm: FC<{
  open: boolean
  onSubmit: (form: TBudgeForm) => void
  onClose: () => void
  initialValues?: TBudgeForm
}> = (props) => {
  const { open, onSubmit, onClose, initialValues } = props
  const { control, handleSubmit, reset, setValue } = useForm<TBudgeForm>({ resolver: yupResolver(schema) })

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
          header={(props) => <Header viewProps={props} />}
          footer={props => <Footer viewProps={props} handleOnSubmit={handleSubmit(onSubmit)} onClose={onClose} />}
          disabled
        >
          <Layout style={styles.form}>
            <Controller
              name={'budget'}
              control={control}
              render={({ field: { value, onChange }, formState: { errors }}) => (
                <TextFieldControl
                  value={value}
                  onChange={onChange}
                  placeholder={'Budget'}
                  label={errors.budget?.message}
                />
              )}
            />
          </Layout>
        </Card>
      </Modal>
    </Layout>
  )
}

export default BudgetForm
