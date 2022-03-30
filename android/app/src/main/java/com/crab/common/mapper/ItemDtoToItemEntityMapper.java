package com.crab.common.mapper;

import com.crab.models.dto.ItemDto;
import com.crab.models.entities.ItemEntity;
import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;

@Mapper
public abstract class ItemDtoToItemEntityMapper {

    @Mapping(source = "id", target = "id", qualifiedByName = { "setObjectId" })
    @Mapping(source = "createDate", target = "createDate", qualifiedByName = { "setCreateDate" })
    public abstract ItemEntity itemDtoToItemEntity(ItemDto itemDto);

    @Named("setObjectId")
    public ObjectId setObjectId(String id){
        if(id != null){
            return new ObjectId(id);
        }

        return new ObjectId();
    }

    @Named("setCreateDate")
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
