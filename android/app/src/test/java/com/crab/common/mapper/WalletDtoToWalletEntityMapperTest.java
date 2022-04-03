package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.dto.WalletDto;
import com.crab.models.entities.WalletEntity;
import com.crab.utils.Constants;

import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;

public class WalletDtoToWalletEntityMapperTest {

    @Test
    public void walletDtoWithEmptyItemDtoListTest(){
        Calendar calendar = Calendar.getInstance();

        String date = calendar.getTime().toString();

        WalletDto walletDto = new WalletDto();
        walletDto.setName("Wallet One");
        walletDto.setCreateDate(date);
        walletDto.setItems(new ArrayList<>());

        WalletDtoToWalletEntityMapper walletDtoToWalletEntityMapper = Mappers.getMapper(WalletDtoToWalletEntityMapper.class);

        WalletEntity walletEntity = walletDtoToWalletEntityMapper.walletDtoToWalletEntity(walletDto);

        assert(walletEntity != null);
    }

    @Test
    public void walletDtoWithItemDtoListTest(){
        Calendar calendar = Calendar.getInstance();

        String date = calendar.getTime().toString();

        ItemDto itemDtoOne = new ItemDto();
        itemDtoOne.setName("ItemOne");
        itemDtoOne.setAmount(45.00f);
        itemDtoOne.setRecurring(false);
        itemDtoOne.setType(Constants.ITEM_TYPE_CREDIT);
        itemDtoOne.setCreateDate(date);

        ItemDto itemDtoTwo = new ItemDto();
        itemDtoTwo.setName("ItemTwo");
        itemDtoTwo.setAmount(45.00f);
        itemDtoTwo.setRecurring(false);
        itemDtoTwo.setType(Constants.ITEM_TYPE_DEBIT);
        itemDtoTwo.setCreateDate(date);

        WalletDto walletDto = new WalletDto();
        walletDto.setName("Wallet One");
        walletDto.setCreateDate(date);
        walletDto.setItems(Arrays.asList(itemDtoOne, itemDtoTwo));

        WalletDtoToWalletEntityMapper walletDtoToWalletEntityMapper = Mappers.getMapper(WalletDtoToWalletEntityMapper.class);

        WalletEntity walletEntity = walletDtoToWalletEntityMapper.walletDtoToWalletEntity(walletDto);

        assert(walletEntity != null);
    }
}
