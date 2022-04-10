package com.crab.common.mapper;

import com.crab.models.dto.WalletDto;
import com.crab.models.dto.WalletItemDto;
import com.crab.models.entities.WalletEntity;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Calendar;

public class WalletItemDtoToWalletEntityMapperTest {

    @Test
    public void walletItemDtoToWalletEntityTest(){
        ObjectId objectId = new ObjectId();
        Calendar calendar = Calendar.getInstance();
        String date = calendar.getTime().toString();

        WalletDto walletDto = new WalletDto();
        walletDto.setId(objectId.toHexString());
        walletDto.setName("Wallet One");
        walletDto.setCreateDate(date);

        WalletItemDto walletItemDto = new WalletItemDto();
        walletItemDto.setName("Item One");
        walletItemDto.setAmount(45.00f);
        walletItemDto.setRecurring(false);
        walletItemDto.setType(Constants.ITEM_TYPE_EXPENSE);
        walletItemDto.setWallet(walletDto);

        WalletItemDtoToWalletEntityMapper walletItemDtoToWalletEntityMapper = Mappers.getMapper(WalletItemDtoToWalletEntityMapper.class);
        WalletEntity walletEntity = walletItemDtoToWalletEntityMapper.walletItemDtoToWalletEntity(walletItemDto);

        assert(walletEntity != null);
    }
}
