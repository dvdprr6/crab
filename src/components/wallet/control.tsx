import React, { FC, useCallback, useState } from 'react'
import { Autocomplete, AutocompleteItem, Radio, RadioGroup } from '@ui-kitten/components'
import { TWalletDto } from '@crab-models'

export const WalletSelectAutoCompleteControl: FC<{
  value: any
  wallets: TWalletDto[]
  onChange: (wallet: TWalletDto) => void
}> = (props) => {
  const { value, wallets, onChange } = props
  const [data, setData] = useState<TWalletDto[]>(wallets)

  const onSelect = useCallback((index: number) => {
    const selectedWallet = wallets[index]

    onChange(selectedWallet)
  }, [value])

  const onChangeText = useCallback((text: string) => {
    const filterWallets = wallets.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
    setData(filterWallets)
  }, [data])

  return(
    <Autocomplete
      value={value?.name}
      placeholder={'Select Wallet'}
      onSelect={index => onSelect(index)}
      onChangeText={text => onChangeText(text)}
    >
      {data.map((item, index) => <AutocompleteItem key={index} title={item.name} />)}
    </Autocomplete>
  )
}


