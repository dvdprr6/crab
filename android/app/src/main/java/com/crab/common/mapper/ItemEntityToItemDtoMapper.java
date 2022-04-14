package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.utils.Constants;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public abstract class ItemEntityToItemDtoMapper{
    public abstract ItemDto itemEntityToItemDto(ItemEntity itemEntity);
}
