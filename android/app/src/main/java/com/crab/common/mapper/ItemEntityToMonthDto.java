package com.crab.common.mapper;

import com.crab.models.entities.ItemEntity;

import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ItemEntityToMonthDto {
    default MonthDto itemEntityToMonthDto(List<ItemEntity> itemEntitiesList){
        MonthDto monthDto = new MonthDto();
        

        return monthDto;
    }
}
//@Mapper
//public abstract class ItemEntityToMonthDto {
//
//    public MonthDto itemEntityToMonthDto(List<ItemEntity> itemEntityList){
//
//    }
//
//}
