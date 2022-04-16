import React, { useEffect, FC } from 'react'
import { Layout, Text, Modal, Button, Card, Spinner } from '@ui-kitten/components'
import { useForm, Controller } from 'react-hook-form'
import { ViewProps, StyleSheet, GestureResponderEvent, Dimensions } from 'react-native'
import { FilterDateRangeControl } from './controls'
import { TFilterForm } from '@crab-models'
import { MTD } from '@crab-utils'

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
      <Button disabled={loading} appearance={'ghost'} accessoryLeft={() => loading ? <Spinner size={'tiny'} /> : <></>} onPress={handleOnSubmit}>Submit</Button>
    </Layout>
  )
}

const FilterForm: FC<{
  open: boolean
  onSubmit: (form: any) => void
  onClose: () => void
  loading: boolean
}> = (props) => {
  const { open, onSubmit, onClose, loading } = props
  const { control, handleSubmit, reset } = useForm<TFilterForm>()

  useEffect(() => {
    if(!open){
      reset()
    }
  }, [open])

  return (
    <Layout level={'1'}>
      <Modal visible={open} style={styles.container}>
        <Card
          header={(props) => <Header viewProps={props} title={'Select Date Range'} />}
          footer={(props) => <Footer loading={loading} handleOnSubmit={handleSubmit(onSubmit)} onClose={onClose} viewProps={props} />}
          disabled
        >
          <Layout style={styles.form}>
            <Controller
              name={'filter'}
              defaultValue={MTD}
              control={control}
              render={({ field: { value, onChange }}) => (
                <FilterDateRangeControl
                  value={value}
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

export default FilterForm
