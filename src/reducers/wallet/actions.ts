import {
  WALLET_DETAILS_GET_ALL_SUCCESS,
  WALLET_DETAILS_CREATE_SUCCESS,
  TWalletDetailsAction,
  WALLET_DETAILS_UPDATE_SUCCESS,
  WALLET_DETAILS_DELETE_SUCCESS,
} from './types'
import { Wallet } from '@crab-modules'
import { createAction } from '../types'
import { TWalletDto, TWalletItemDto } from "@crab-models";

export function getWalletsDetails(): Promise<TWalletDetailsAction>{
  return new Promise<TWalletDetailsAction>(async resolve => {
    const walletDetails = await Wallet.getAllWallets()
    resolve(createAction(WALLET_DETAILS_GET_ALL_SUCCESS, walletDetails))
  })
}

export function createWallet(walletDto: TWalletDto): Promise<TWalletDetailsAction>{
  return new Promise<TWalletDetailsAction>(async resolve => {
    const walletDetails = await Wallet.createWallet(walletDto)
    resolve(createAction(WALLET_DETAILS_CREATE_SUCCESS, walletDetails))
  })
}

export function updateWallet(walletDto: TWalletDto): Promise<TWalletDetailsAction>{
  return new Promise<TWalletDetailsAction>(async resolve => {
    const walletDetails = await Wallet.updateWallet(walletDto)
    resolve(createAction(WALLET_DETAILS_UPDATE_SUCCESS, walletDetails))
  })
}

export function updateWalletItem(walletItemDto: TWalletItemDto): Promise<TWalletDetailsAction>{
  return new Promise<TWalletDetailsAction>(async resolve => {
    const walletDetails = await Wallet.updateWalletWithItem(walletItemDto)
    resolve(createAction(WALLET_DETAILS_UPDATE_SUCCESS, walletDetails))
  })
}

export function deleteWallet(walletDto: TWalletDto): Promise<TWalletDetailsAction>{
  return new Promise<TWalletDetailsAction>(async resolve => {
    const walletDetails = await Wallet.deleteWallet(walletDto)
    resolve(createAction(WALLET_DETAILS_DELETE_SUCCESS, walletDetails))
  })
}
