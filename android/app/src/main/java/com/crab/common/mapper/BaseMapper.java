package com.crab.common.mapper;

import com.crab.utils.Constants;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

//@Mapper
public abstract class BaseMapper {
    @Named("setObjectId")
    protected ObjectId setObjectId(String id){
        if(id != null){
            return new ObjectId(id);
        }
        return new ObjectId();
    }

    @Named("convertObjectIdToString")
    public String convertObjectIdToString(ObjectId id){
        return id.toHexString();
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
