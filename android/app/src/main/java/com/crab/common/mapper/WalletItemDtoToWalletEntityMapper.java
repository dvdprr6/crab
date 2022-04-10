package com.crab.common.mapper;

import com.crab.models.dto.WalletItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.models.entities.WalletEntity;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Arrays;
import java.util.List;

@Mapper
public abstract class WalletItemDtoToWalletEntityMapper {

    @Mapping(source = "wallet.id", target = "id")
    @Mapping(source = "wallet.name", target = "name")
    @Mapping(source = "wallet.createDate", target = "createDate")
    @Mapping(source = ".", target = "items")
    public abstract WalletEntity walletItemDtoToWalletEntity(WalletItemDto walletItemDto);

    public List<ItemEntity> toItemEntityList(WalletItemDto walletItemDto){
        ItemEntity itemEntity = new ItemEntity();
        itemEntity.setName(walletItemDto.getName());
        itemEntity.setAmount(walletItemDto.getAmount());
        itemEntity.setRecurring(walletItemDto.getRecurring());
        itemEntity.setType(walletItemDto.getType());

        return Arrays.asList(itemEntity);
    }
}
