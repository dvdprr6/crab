import React, { FC, useCallback } from "react";
import { CheckBox, Text, RadioGroup, Input } from "@ui-kitten/components";
import { ChildrenWithProps } from '@ui-kitten/components/devsupport'
import { RadioProps } from '@ui-kitten/components/ui/radio/radio.component'
import { KeyboardTypeOptions } from 'react-native'

export const CheckBoxControl: FC<{
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

function useRadioGroupControl(radioGroup: { value: any, options: string[] }): { index: number }{
  const { value, options } = radioGroup
  let index = options.findIndex(item => item === value)

  if(index === -1) {
    index = 0
  }

  return { index }

}

export const RadioGroupControl: FC<{
  value: any
  title: string
  options: string[]
  onChange: (text: string) => void
  children: ChildrenWithProps<RadioProps>
}> = (props) => {
  const { value, title, options, onChange, children } = props
  const { index } = useRadioGroupControl({ value, options })

  const onRadioChange = useCallback(index => {
    const selectedOption = options[index]
    onChange(selectedOption)
  }, [value])

  return(
    <React.Fragment>
      <Text>{title}</Text>
      <RadioGroup
        selectedIndex={index}
        onChange={index => onRadioChange(index)}
      >
        {children}
      </RadioGroup>
    </React.Fragment>
  )
}

export const TextFieldControl: FC<{
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
