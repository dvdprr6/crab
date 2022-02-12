import React, { FC } from 'react'
import { Input } from '@ui-kitten/components'

const TextFieldControl: FC<{
  value: any
  onChange: (text: string) => void
  placeholder: string
  disabled?: boolean
  label?: string
}> = (props) => {
  const { value, onChange, placeholder, disabled, label } = props

  return (
    <Input
      value={value}
      onChangeText={(text: string) => onChange(text)}
      placeholder={placeholder}
      disabled={disabled}
      label={label}
    />
  )
}

export default TextFieldControl
