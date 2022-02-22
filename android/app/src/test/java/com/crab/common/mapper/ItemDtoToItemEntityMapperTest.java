package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.text.SimpleDateFormat;
import java.util.Calendar;

public class ItemDtoToItemEntityMapperTest {

    @Test
    public void convertItemDtoToItemEntity(){
        String dateString = generateDate();
        ObjectId objectId = new ObjectId();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(objectId.toHexString());
        itemDto.setItemName("TestItem");
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setItemType("Expense");
        itemDto.setCreateDate(dateString);
        itemDto.setModifiedDate(dateString);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }

    @Test
    public void convertItemDtoToItemEntityWithoutObjectId(){
        String dateString = generateDate();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(null);
        itemDto.setItemName("TestItem");
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setItemType("Expense");
        itemDto.setCreateDate(dateString);
        itemDto.setModifiedDate(dateString);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }

    @Test
    public void convertItemDtoToItemEntityWithoutCreateDate(){
        String dateString = generateDate();
        ObjectId objectId = new ObjectId();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(objectId.toHexString());
        itemDto.setItemName("TestItem");
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setItemType("Expense");
        itemDto.setCreateDate(null);
        itemDto.setModifiedDate(dateString);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }

    @Test
    public void convertItemDtoToItemEntityWithoutModifiedDate(){
        String dateString = generateDate();
        ObjectId objectId = new ObjectId();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(objectId.toHexString());
        itemDto.setItemName("TestItem");
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setItemType("Expense");
        itemDto.setCreateDate(dateString);
        itemDto.setModifiedDate(null);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }

    private String generateDate(){
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(Constants.DATE_FORMAT);

        return simpleDateFormat.format(calendar.getTime());
    }
}
