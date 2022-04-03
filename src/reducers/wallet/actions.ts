import { WALLET_DETAILS_GET_ALL_SUCCESS, TWalletDetailsAction } from './types'
import { Wallet } from '@crab-modules'
import { createAction } from '../types'
import { TWalletDto } from '@crab-models'

export function getWalletsDetails(): Promise<TWalletDetailsAction>{
  return new Promise<TWalletDetailsAction>(async resolve => {
    const walletDetails = await Wallet.getAllWallets()

    resolve(createAction(WALLET_DETAILS_GET_ALL_SUCCESS, walletDetails))
  })
}

export function createWallet(walletDto: TWalletDto): Promise<TWalletDetailsAction>{
  return new Promise<TWalletDetailsAction>(async resolve => {
    const walletDetails = await Wallet.upsertWallet(walletDto)

    resolve(createAction(WALLET_DETAILS_GET_ALL_SUCCESS, walletDetails))
  })
}
