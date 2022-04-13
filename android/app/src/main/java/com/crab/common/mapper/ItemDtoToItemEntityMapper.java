package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;

import org.mapstruct.Mapper;

@Mapper
public abstract class ItemDtoToItemEntityMapper{
    public abstract ItemEntity itemDtoToItemEntity(ItemDto itemDto);
}
