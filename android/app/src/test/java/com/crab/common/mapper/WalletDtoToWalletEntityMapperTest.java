package com.crab.common.mapper;

import com.crab.models.dto.WalletDto;
import com.crab.models.entities.WalletEntity;

import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Calendar;

public class WalletDtoToWalletEntityMapperTest {

    @Test
    public void walletDtoToWalletEntityTest(){
        Calendar calendar = Calendar.getInstance();

        String date = calendar.getTime().toString();

        WalletDto walletDto = new WalletDto();
        walletDto.setName("Wallet One");
        walletDto.setCreateDate(date);

        WalletDtoToWalletEntityMapper walletDtoToWalletEntityMapper = Mappers.getMapper(WalletDtoToWalletEntityMapper.class);

        WalletEntity walletEntity = walletDtoToWalletEntityMapper.walletDtoToWalletEntity(walletDto);

        assert(walletEntity != null);
    }
}
