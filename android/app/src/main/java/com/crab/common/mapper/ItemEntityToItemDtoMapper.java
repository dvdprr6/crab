package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Date;

@Mapper
public abstract class ItemEntityToItemDtoMapper {

    @Mapping(source = "id", target = "id", qualifiedByName = { "convertObjectIdToString" })
    @Mapping(source = "createDate", target = "createDate", qualifiedByName = { "convertDateToString" })
    @Mapping(source = "modifiedDate", target = "modifiedDate", qualifiedByName = { "convertDateToString" })
    public abstract ItemDto itemEntityToItemDto(ItemEntity itemEntity);

    @Named("convertObjectIdToString")
    public String convertObjectIdToString(ObjectId id){
        return id.toHexString();
    }

    @Named("convertDateToString")
    public String convertDateToString(Date date){
        return date.toString();
    }
}
