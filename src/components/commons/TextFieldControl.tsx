import React, { FC } from 'react'
import { Input } from '@ui-kitten/components'

const TextFieldControl: FC<{
  value: any
  onChange: (text: string) => void
  placeholder: string
  disabled?: boolean
}> = (props) => {
  const { value, onChange, placeholder, disabled } = props

  return (
    <Input
      value={value}
      onChangeText={(text: string) => onChange(text)}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
}

export default TextFieldControl
