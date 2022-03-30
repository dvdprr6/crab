import { WALLET_GET_ALL_SUCCESS, TWalletAction } from './types'
import { Wallet } from '@crab-modules'
import { createAction } from '../types'
import { TWalletDto } from '@crab-models'

export function getAllWallets(): Promise<TWalletAction>{
  return new Promise<TWalletAction>(async resolve => {
    const wallets = await Wallet.getAllWallets()

    const payload = {
      value: wallets,
      isError: false,
      error: ''
    }

    resolve(createAction(WALLET_GET_ALL_SUCCESS, payload))
  })
}
