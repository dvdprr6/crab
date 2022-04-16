package com.crab.models.service;

import com.crab.common.mapper.ItemDtoToItemEntityMapper;
import com.crab.common.mapper.ItemEntityToItemDtoMapper;
import com.crab.models.dto.ItemDetailsDto;
import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.models.repository.ItemRepository;
import com.crab.utils.Constants;
import com.crab.utils.DateUtils;
import com.crab.utils.ModelConverter;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

import org.bson.types.ObjectId;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class ItemService {
    private ItemRepository itemRepository;

    public ItemService(){
        itemRepository = new ItemRepository();
    }

    public WritableMap monthToDateItems(String id){
        Date fromDate = DateUtils.beginningOfMonth();
        Date toDate = DateUtils.currentDate();

        ObjectId objectId = new ObjectId(id);

        List<ItemEntity> itemEntityList = itemRepository.getItemsByDateRange(objectId, fromDate, toDate);

        ItemEntityToItemDtoMapper itemEntityToItemDtoMapper = Mappers.getMapper(ItemEntityToItemDtoMapper.class);

        List<ItemDto> itemDtoList = itemEntityList.stream()
                .map(item -> itemEntityToItemDtoMapper.itemEntityToItemDto(item))
                .collect(Collectors.toList());

        ItemDetailsDto itemDetailsDto = calculateItemDetailsDto(itemDtoList);

        WritableMap writableMap = ModelConverter.convertModelToWritableMap(itemDetailsDto);

        return writableMap;
    }

    public WritableMap yearToDateItems(String id){
        Date fromDate = DateUtils.beginningOfYear();
        Date toDate = DateUtils.currentDate();

        ObjectId objectId = new ObjectId(id);

        List<ItemEntity> itemEntityList = itemRepository.getItemsByDateRange(objectId, fromDate, toDate);

        ItemEntityToItemDtoMapper itemEntityToItemDtoMapper = Mappers.getMapper(ItemEntityToItemDtoMapper.class);

        List<ItemDto> itemDtoList = itemEntityList.stream()
                .map(item -> itemEntityToItemDtoMapper.itemEntityToItemDto(item))
                .collect(Collectors.toList());

        ItemDetailsDto itemDetailsDto = calculateItemDetailsDto(itemDtoList);

        WritableMap writableMap = ModelConverter.convertModelToWritableMap(itemDetailsDto);

        return writableMap;
    }

    public void upsertItem(ReadableMap readableMap){
        ItemDto itemDto = ModelConverter.convertReadableMapToModel(readableMap, ItemDto.class);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        itemRepository.upsert(itemEntity);
    }

    public void deleteItem(ReadableMap readableMap){
        ItemDto itemDto = ModelConverter.convertReadableMapToModel(readableMap, ItemDto.class);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        itemRepository.delete(itemEntity);
    }

    private ItemDetailsDto calculateItemDetailsDto(List<ItemDto> itemDtoList){
        List<ItemDto> filterRevenueItems = itemDtoList.stream().filter(item -> item.getType().equals(Constants.ITEM_TYPE_REVENUE)).collect(Collectors.toList());
        List<ItemDto> filterExpenseItems = itemDtoList.stream().filter(item -> item.getType().equals(Constants.ITEM_TYPE_EXPENSE)).collect(Collectors.toList());

        Float totalRevenue = filterRevenueItems.stream()
                .map(item -> item.getAmount())
                .reduce(0f, (a, b) -> a + b)
                .floatValue();

        Float totalExpenses = filterExpenseItems.stream()
                .map(item -> item.getAmount())
                .reduce(0f, (a, b) -> a + b)
                .floatValue();

        Float totalSavings = totalRevenue - totalExpenses;

        String status = calculateLeverageStatus(totalRevenue, totalExpenses);

        ItemDetailsDto itemDetailsDto = new ItemDetailsDto();
        itemDetailsDto.setStatus(status);
        itemDetailsDto.setTotalExpense(totalExpenses);
        itemDetailsDto.setTotalRevenue(totalRevenue);
        itemDetailsDto.setTotalSavings(totalSavings);
        itemDetailsDto.setItems(itemDtoList);

        return itemDetailsDto;
    }

    private String calculateLeverageStatus(Float revenue, Float expense){
        Float debtRatio = expense / revenue;

        if(debtRatio <= 0.7){
            return Constants.GREEN_STATUS;
        }else if(debtRatio > 0.7 && debtRatio <= 0.9){
            return Constants.YELLOW_STATUS;
        }else{
            return Constants.RED_STATUS;
        }
    }
}
