package com.crab.common.mapper;

import com.crab.models.dto.WalletDto;
import com.crab.models.entities.WalletEntity;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(uses = ItemDtoToItemEntityMapper.class)
public abstract class WalletDtoToWalletEntityMapper{
    public abstract WalletEntity walletDtoToWalletEntity(WalletDto walletDto);
}
