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
        Calendar calendar = Calendar.getInstance();
        String date = calendar.getTime().toString();

        ObjectId objectId = new ObjectId();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(objectId.toHexString());
        itemDto.setName("Item One");
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setCreateDate(date);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }

    @Test
    public void convertItemDtoToItemEntityWithoutObjectId(){
        Calendar calendar = Calendar.getInstance();
        String date = calendar.getTime().toString();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(null);
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setCreateDate(date);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }

    @Test
    public void convertItemDtoToItemEntityWithoutCreateDate(){
        ObjectId objectId = new ObjectId();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(objectId.toHexString());
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setCreateDate(null);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }

    @Test
    public void convertItemDtoToItemEntityWithoutModifiedDate(){
        Calendar calendar = Calendar.getInstance();
        String date = calendar.getTime().toString();

        ObjectId objectId = new ObjectId();

        ItemDto itemDto = new ItemDto();
        itemDto.setId(objectId.toHexString());
        itemDto.setAmount(338.00F);
        itemDto.setRecurring(false);
        itemDto.setCreateDate(date);

        ItemDtoToItemEntityMapper itemDtoToItemEntityMapper = Mappers.getMapper(ItemDtoToItemEntityMapper.class);

        ItemEntity itemEntity = itemDtoToItemEntityMapper.itemDtoToItemEntity(itemDto);

        assert(itemEntity != null);
    }
}
