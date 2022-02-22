package com.crab.models.service;

import com.crab.common.mapper.ItemDtoToItemEntityMapper;
import com.crab.common.mapper.ItemEntityToItemDtoMapper;
import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.models.repository.ItemRepository;
import com.crab.utils.DateUtils;
import com.crab.utils.ModelConverter;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ItemService {
    private ItemRepository itemRepository;

    public ItemService(){
        itemRepository = new ItemRepository();
    }

    public WritableArray monthToDateItems(){
        Date fromDate = DateUtils.beginningOfMonth();
        Date toDate = DateUtils.currentDate();

        List<ItemEntity> itemEntityList = itemRepository.getItemsByDateRange(fromDate, toDate);

        ItemEntityToItemDtoMapper itemEntityToItemDtoMapper = Mappers.getMapper(ItemEntityToItemDtoMapper.class);

        List<ItemDto> itemDtoList = itemEntityList.stream()
                .map(item -> itemEntityToItemDtoMapper.itemEntityToItemDto(item))
                .collect(Collectors.toList());

        WritableArray writableArray = ModelConverter.convertModelToWritableArray(itemDtoList);

        return writableArray;
    }

    public void upsertItem(ReadableMap readableMap){
        ItemDto itemDto = ModelConverter.convertReadableMapToModel(readableMap, ItemDto.class);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        itemRepository.upsert(itemEntity);
    }
}
