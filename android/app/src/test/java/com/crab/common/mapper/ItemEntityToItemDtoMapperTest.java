package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.Calendar;

public class ItemEntityToItemDtoMapperTest {

    @Test
    public void convertItemEntityToItemDtoTest(){
        Calendar calendar = Calendar.getInstance();

        Date createDate = calendar.getTime();
        Date modifiedDate = calendar.getTime();
        ObjectId objectId = new ObjectId();

        ItemEntity itemEntity = new ItemEntity();
        itemEntity.setId(objectId);
        itemEntity.setAmount(3673.00F);
        itemEntity.setRecurring(false);
        itemEntity.setCreateDate(createDate);

        ItemEntityToItemDtoMapper itemEntityToItemDtoMapper = Mappers.getMapper(ItemEntityToItemDtoMapper.class);

        ItemDto itemDto = itemEntityToItemDtoMapper.itemEntityToItemDto(itemEntity);

        assert(itemDto != null);
    }
}
