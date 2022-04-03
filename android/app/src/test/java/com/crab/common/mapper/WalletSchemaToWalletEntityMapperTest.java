package com.crab.common.mapper;

import com.crab.models.entities.WalletEntity;
import com.crab.models.schema.ItemSchema;
import com.crab.models.schema.WalletSchema;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.Calendar;

import io.realm.RealmList;

public class WalletSchemaToWalletEntityMapperTest {

    @Test
    public void walletSchemaToWalletEntityTest(){
        Calendar calendar = Calendar.getInstance();
        Date date = calendar.getTime();

        ItemSchema itemSchemaOne = new ItemSchema();
        itemSchemaOne.setId(new ObjectId());
        itemSchemaOne.setName("ItemOne");
        itemSchemaOne.setAmount(45.00f);
        itemSchemaOne.setRecurring(false);
        itemSchemaOne.setType(Constants.ITEM_TYPE_CREDIT);
        itemSchemaOne.setCreateDate(date);

        ItemSchema itemSchemaTwo = new ItemSchema();
        itemSchemaTwo.setId(new ObjectId());
        itemSchemaTwo.setName("ItemTwo");
        itemSchemaTwo.setAmount(45.00f);
        itemSchemaTwo.setRecurring(false);
        itemSchemaTwo.setType(Constants.ITEM_TYPE_DEBIT);
        itemSchemaTwo.setCreateDate(date);

        RealmList<ItemSchema> walletSchemaRealmList = new RealmList<>();
        walletSchemaRealmList.add(itemSchemaOne);
        walletSchemaRealmList.add(itemSchemaTwo);

        WalletSchema walletSchema = new WalletSchema();
        walletSchema.setId(new ObjectId());
        walletSchema.setName("Wallet One");
        walletSchema.setCreateDate(date);
        walletSchema.setItems(walletSchemaRealmList);

        WalletSchemaToWalletEntityMapper walletSchemaToWalletEntityMapper = Mappers.getMapper(WalletSchemaToWalletEntityMapper.class);

        WalletEntity walletEntity = walletSchemaToWalletEntityMapper.walletSchemaToWalletEntity(walletSchema);

        assert(walletEntity != null);
    }
}
