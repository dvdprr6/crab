import React, { useState, useCallback } from 'react'
import { Text, Layout, Card, Button, Icon } from '@ui-kitten/components'
import { StyleSheet } from 'react-native'
import BudgetForm from './BudgetForm'
import { TBudgeForm } from '@crab-models'

const styles = StyleSheet.create({
  card: {
    margin: 2
  },
  budget: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }
})

const Settings = () => {
  const [openBudgetForm, setOpenBudgetForm] = useState<boolean>(false)
  const [form, setForm] = useState<TBudgeForm>({} as TBudgeForm)

  const onBudgetOpen = useCallback(() => {
    setOpenBudgetForm(true)
  }, [openBudgetForm])

  const onBudgetClose = useCallback(() => {
    setOpenBudgetForm(false)
  }, [openBudgetForm])

  return(
    <Layout>
      <Card
        style={styles.card}
        disabled
        header={headerProps => (
          <Layout {...headerProps} style={styles.button}>
            <Button
              appearance={'ghost'}
              accessoryLeft={props => <Icon {...props} name={'edit-outline'} />}
              onPress={() => onBudgetOpen()}
            />
          </Layout>
        )}
      >
        <Layout style={styles.budget}>
          <Text>Budget</Text>
          <Text>4884.02</Text>
        </Layout>
      </Card>
      <Layout>
        <BudgetForm
          open={openBudgetForm}
          onSubmit={setForm}
          onClose={onBudgetClose}
        />
      </Layout>
    </Layout>
  )
}

export default Settings
