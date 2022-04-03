package com.crab.common.mapper;

import com.crab.models.entities.ItemEntity;
import com.crab.models.schema.ItemSchema;
import com.crab.utils.Constants;

import org.junit.Test;
import org.mapstruct.factory.Mappers;

import java.util.Calendar;

public class ItemEntityToItemSchemaMapperTest {

    @Test
    public void itemEntityToItemSchemaTest(){
        Calendar calendar = Calendar.getInstance();

        String date = calendar.getTime().toString();

        ItemEntity itemEntity = new ItemEntity();
        itemEntity.setName("itemOne");
        itemEntity.setAmount(45.00f);
        itemEntity.setRecurring(false);
        itemEntity.setType(Constants.ITEM_TYPE_CREDIT);
        itemEntity.setCreateDate(date);

        ItemEntityToItemSchemaMapper itemEntityToItemSchemaMapper = Mappers.getMapper(ItemEntityToItemSchemaMapper.class);

        ItemSchema itemSchema = itemEntityToItemSchemaMapper.itemEntityToItemSchema(itemEntity);

        assert(itemSchema != null);
    }
}
