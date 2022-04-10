package com.crab.common.mapper;

import com.crab.models.entities.ItemEntity;
import com.crab.models.entities.WalletEntity;
import com.crab.models.schema.WalletSchema;
import com.crab.utils.Constants;

import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;

public class WalletEntityToWalletSchemaTest {

    @Test
    public void walletDtoWithEmptyItemsDtoListTest(){
        Calendar calendar = Calendar.getInstance();

        String date = calendar.getTime().toString();

        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setName("Wallet One");
        walletEntity.setCreateDate(date);
        walletEntity.setItems(new ArrayList<>());

        WalletEntityToWalletSchemaMapper walletEntityToWalletSchemaMapper = Mappers.getMapper(WalletEntityToWalletSchemaMapper.class);

        WalletSchema walletSchema = walletEntityToWalletSchemaMapper.walletEntityToWalletSchema(walletEntity);

        assert(walletSchema != null);
    }

    @Test
    public void walletWithItemsTest(){
        Calendar calendar = Calendar.getInstance();

        String date = calendar.getTime().toString();

        ItemEntity itemEntityOne = new ItemEntity();
        itemEntityOne.setName("ItemOne");
        itemEntityOne.setAmount(45.00f);
        itemEntityOne.setRecurring(false);
        itemEntityOne.setType(Constants.ITEM_TYPE_EXPENSE);
        itemEntityOne.setCreateDate(date);

        ItemEntity itemEntityTwo = new ItemEntity();
        itemEntityTwo.setName("ItemTwo");
        itemEntityTwo.setAmount(45.00f);
        itemEntityTwo.setRecurring(false);
        itemEntityTwo.setType(Constants.ITEM_TYPE_REVENUE);
        itemEntityTwo.setCreateDate(date);

        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setName("Wallet One");
        walletEntity.setCreateDate(date);
        walletEntity.setItems(Arrays.asList(itemEntityOne, itemEntityTwo));

        WalletEntityToWalletSchemaMapper walletEntityToWalletSchemaMapper = Mappers.getMapper(WalletEntityToWalletSchemaMapper.class);

        WalletSchema walletSchema = walletEntityToWalletSchemaMapper.walletEntityToWalletSchema(walletEntity);

        assert(walletSchema != null);
    }
}
