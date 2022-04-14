package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Calendar;

public class ItemEntityToItemDtoMapperTest {

    @Test
    public void convertItemEntityToItemDtoTest(){
        Calendar calendar = Calendar.getInstance();
        String createDate = calendar.getTime().toString();

        ObjectId objectId = new ObjectId();

        ItemEntity itemEntity = new ItemEntity();
        itemEntity.setName("ItemOne");
        itemEntity.setId(objectId.toHexString());
        itemEntity.setAmount(3673.00F);
        itemEntity.setRecurring(false);
        itemEntity.setCreateDate(createDate);
        itemEntity.setType(Constants.ITEM_TYPE_EXPENSE);

        ItemEntityToItemDtoMapper itemEntityToItemDtoMapper = Mappers.getMapper(ItemEntityToItemDtoMapper.class);

        ItemDto itemDto = itemEntityToItemDtoMapper.itemEntityToItemDto(itemEntity);

        assert(itemDto != null);
    }
}
