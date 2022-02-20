import React, { FC, useCallback } from 'react'
import { RadioGroup, Text } from '@ui-kitten/components'
import { ChildrenWithProps } from '@ui-kitten/components/devsupport'
import { RadioProps } from '@ui-kitten/components/ui/radio/radio.component'

const RadioGroupControl: FC<{
  value: any
  title: string
  options: string[]
  onChange: (text: string) => void
  children: ChildrenWithProps<RadioProps>
}> = (props) => {
  const { value, title, options, onChange, children } = props

  const onRadioChange = useCallback(opt => {
    const selectedOption = options.find(item => item === opt) || ''
    onChange(selectedOption)
  }, [value])

  return(
    <React.Fragment>
      <Text>{title}</Text>
      <RadioGroup
        selectedIndex={options.findIndex(item => item === value)}
        onChange={index => onRadioChange(index)}
      >
        {children}
      </RadioGroup>
    </React.Fragment>
  )
}

export default RadioGroupControl
