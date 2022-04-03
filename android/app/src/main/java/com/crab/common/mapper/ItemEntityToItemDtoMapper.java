package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Date;

//@Mapper
public abstract class ItemEntityToItemDtoMapper{

    @Mapping(source = "id", target = "id", qualifiedByName = { "convertObjectIdToString" })
    @Mapping(source = "createDate", target = "createDate", dateFormat = Constants.DATE_FORMAT)
    public abstract ItemDto itemEntityToItemDto(ItemEntity itemEntity);
}
