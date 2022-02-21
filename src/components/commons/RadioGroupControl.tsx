import React, { FC, useCallback } from 'react'
import { RadioGroup, Text } from '@ui-kitten/components'
import { ChildrenWithProps } from '@ui-kitten/components/devsupport'
import { RadioProps } from '@ui-kitten/components/ui/radio/radio.component'

function useRadioGroupControl(radioGroup: { value: any, options: string[] }): { index: number }{
  const { value, options } = radioGroup
  let index = options.findIndex(item => item === value)

  if(index === -1) {
    index = 0
  }

  return { index }

}

const RadioGroupControl: FC<{
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

export default RadioGroupControl
