package com.crab.common.mapper;

import com.crab.models.entities.ItemEntity;
import com.crab.models.schema.ItemSchema;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Mapper
public abstract class ItemEntityToItemSchemaMapper{

    @Mapping(source = "id", target = "id", qualifiedByName = { "setItemSchemaObjectId" })
    @Mapping(source = "createDate", target = "createDate", qualifiedByName = { "setItemSchemaCreateDate" })
    @Mapping(target = "wallet", ignore = true)
    public abstract ItemSchema itemEntityToItemSchema(ItemEntity itemEntity);

    @Named("setItemSchemaObjectId")
    public ObjectId setObjectId(String id){
        if(id != null){
            return new ObjectId(id);
        }
        return new ObjectId();
    }

    @Named("setItemSchemaCreateDate")
    public Date setCreateDate(String dateString){
        Date date = new Date();

        if(dateString == null){
            Calendar calendar = Calendar.getInstance();
            date = calendar.getTime();
        }else{
            try{
                SimpleDateFormat simpleDateFormat = new SimpleDateFormat(Constants.DATE_FORMAT);
                date = simpleDateFormat.parse(dateString);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }

        return date;
    }
}
