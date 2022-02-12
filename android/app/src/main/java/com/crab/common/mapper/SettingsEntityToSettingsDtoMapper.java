package com.crab.common.mapper;

import com.crab.models.dto.SettingsDto;
import com.crab.models.entities.SettingsEntity;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;

@Mapper
public abstract class SettingsEntityToSettingsDtoMapper {

    public abstract SettingsDto settingsEntityToSettingsDto(SettingsEntity settingsEntity);

    public String convertObjectIdToString(ObjectId id){
        return id.toHexString();
    }
}
