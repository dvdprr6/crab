import React, { FC, useCallback } from 'react'
import { Radio, RadioGroup } from '@ui-kitten/components'
import { MTD, YTD } from '@crab-utils'

export const FilterDateRangeControl: FC<{
  value: any
  onChange: (select: typeof MTD | typeof YTD ) => void
}> = (props) => {
  const { value, onChange } = props

  const onSelect = useCallback((index: number) => {
    if(index === 0){
      onChange(MTD)
    }else{
      onChange(YTD)
    }
  }, [value])

  return(
    <RadioGroup
      selectedIndex={value === MTD ? 0 : 1}
      onChange={index => onSelect(index)}
    >
      <Radio>Month To Date</Radio>
      <Radio>Year To Date</Radio>
    </RadioGroup>
  )
}
