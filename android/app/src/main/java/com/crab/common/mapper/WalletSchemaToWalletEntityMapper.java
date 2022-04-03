package com.crab.common.mapper;

import com.crab.models.entities.WalletEntity;
import com.crab.models.schema.WalletSchema;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(uses = ItemSchemaToItemEntityMapper.class)
public abstract class WalletSchemaToWalletEntityMapper{

    @Mapping(source = "id", target = "id", qualifiedByName = { "convertWalletSchemaObjectIdToString" })
    @Mapping(source = "createDate", target = "createDate", dateFormat = Constants.DATE_FORMAT)
    public abstract WalletEntity walletSchemaToWalletEntity(WalletSchema walletSchema);

    @Named("convertWalletSchemaObjectIdToString")
    public String convertObjectIdToString(ObjectId id){
        return id.toHexString();
    }
}
