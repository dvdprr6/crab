import React, { FC } from 'react'
import { CheckBox, Text } from '@ui-kitten/components'

const CheckBoxControl: FC<{
  value: boolean
  title: string
  onChange: (check: boolean) => void
}> = (props) => {
  const { value, title, onChange } = props

  return(
    <CheckBox
      checked={value}
      onChange={(check: boolean) => onChange(check)}
    >
      <Text>{title}</Text>
    </CheckBox>
  )
}

export default CheckBoxControl
