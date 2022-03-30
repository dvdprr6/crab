package com.crab.common.mapper;

import com.crab.models.dto.WalletDto;
import com.crab.models.entities.WalletEntity;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper
public abstract class WalletEntityToWalletDtoMapper {

    @Mapping(source = "id", target = "id", qualifiedByName = { "convertObjectIdToString" })
    @Mapping(source = "createDate", target = "createDate", dateFormat = Constants.DATE_FORMAT)
    public abstract WalletDto walletEntityToWalletDto(WalletEntity walletEntity);

    @Named("convertObjectIdToString")
    public String convertObjectIdToString(ObjectId id){
        return id.toHexString();
    }
}
