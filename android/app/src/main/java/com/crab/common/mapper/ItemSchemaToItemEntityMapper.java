package com.crab.common.mapper;

import com.crab.models.entities.ItemEntity;
import com.crab.models.schema.ItemSchema;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper
public abstract class ItemSchemaToItemEntityMapper{

    @Mapping(source = "id", target = "id", qualifiedByName = { "convertItemSchemaObjectIdToString" })
    @Mapping(source = "createDate", target = "createDate", dateFormat = Constants.DATE_FORMAT)
    public abstract ItemEntity itemSchemaToItemEntity(ItemSchema itemSchema);

    @Named("convertItemSchemaObjectIdToString")
    public String convertObjectIdToString(ObjectId id){
        return id.toHexString();
    }
}
