import React, { FC } from 'react'
import { Input, Text } from '@ui-kitten/components'
import { KeyboardTypeOptions } from 'react-native'

const TextFieldControl: FC<{
  value: any
  onChange: (text: string) => void
  placeholder: string
  disabled?: boolean
  label?: string
  keyboardType?: KeyboardTypeOptions
}> = (props) => {
  const { value, onChange, placeholder, disabled, label, keyboardType } = props

  return (
    <Input
      value={value}
      onChangeText={(text: string) => onChange(text)}
      placeholder={placeholder}
      disabled={disabled}
      label={() => (<Text status={'primary'}>{label}</Text>)}
      keyboardType={keyboardType}
    />
  )
}

export default TextFieldControl
