package com.crab.common.mapper;

import com.crab.models.entities.ItemEntity;
import com.crab.models.schema.ItemSchema;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.Calendar;

public class ItemSchemaToItemEntityMapperTest {

    @Test
    public void itemSchemaToItemMapperTest(){
        Calendar calendar = Calendar.getInstance();
        Date date = calendar.getTime();

        ItemSchema itemSchema = new ItemSchema();
        itemSchema.setId(new ObjectId());
        itemSchema.setName("ItemOne");
        itemSchema.setAmount(45.00f);
        itemSchema.setRecurring(false);
        itemSchema.setType(Constants.ITEM_TYPE_EXPENSE);
        itemSchema.setCreateDate(date);

        ItemSchemaToItemEntityMapper itemSchemaToItemEntityMapper = Mappers.getMapper(ItemSchemaToItemEntityMapper.class);
        ItemEntity itemEntity = itemSchemaToItemEntityMapper.itemSchemaToItemEntity(itemSchema);

        assert(itemEntity != null);
    }
}
