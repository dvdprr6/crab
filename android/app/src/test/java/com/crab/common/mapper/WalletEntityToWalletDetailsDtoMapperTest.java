package com.crab.common.mapper;

import com.crab.models.dto.WalletDetailsDto;
import com.crab.models.entities.ItemEntity;
import com.crab.models.entities.WalletEntity;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Arrays;
import java.util.Calendar;

public class WalletEntityToWalletDetailsDtoMapperTest {

    @Test
    public void calculateWalletDetails(){
        Calendar calendar = Calendar.getInstance();
        String date = calendar.getTime().toString();

        ObjectId objectIdItemOne = new ObjectId();
        ObjectId objectIdItemTwo = new ObjectId();
        ObjectId objectIdWallet = new ObjectId();

        ItemEntity itemEntityOne = new ItemEntity();
        itemEntityOne.setId(objectIdItemOne.toHexString());
        itemEntityOne.setName("ItemOne");
        itemEntityOne.setAmount(45.00f);
        itemEntityOne.setRecurring(false);
        itemEntityOne.setType(Constants.ITEM_TYPE_EXPENSE);
        itemEntityOne.setCreateDate(date);

        ItemEntity itemEntityTwo = new ItemEntity();
        itemEntityTwo.setId(objectIdItemTwo.toHexString());
        itemEntityTwo.setName("ItemTwo");
        itemEntityTwo.setAmount(45.00f);
        itemEntityTwo.setRecurring(false);
        itemEntityTwo.setType(Constants.ITEM_TYPE_REVENUE);
        itemEntityTwo.setCreateDate(date);

        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setId(objectIdWallet.toHexString());
        walletEntity.setName("Wallet One");
        walletEntity.setCreateDate(date);
        walletEntity.setItems(Arrays.asList(itemEntityOne, itemEntityTwo));

        WalletEntityToWalletDetailsMapper walletEntityToWalletDetailsMapper = Mappers.getMapper(WalletEntityToWalletDetailsMapper.class);

        WalletDetailsDto walletDetailsDto = walletEntityToWalletDetailsMapper.walletEntityToWalletDetailsDto(walletEntity);

        assert(walletDetailsDto != null);
    }
}
