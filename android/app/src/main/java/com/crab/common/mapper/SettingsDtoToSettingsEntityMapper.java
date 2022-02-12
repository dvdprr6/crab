package com.crab.common.mapper;

import com.crab.models.dto.SettingsDto;
import com.crab.models.entities.SettingsEntity;

import org.bson.types.ObjectId;
import org.mapstruct.Mapper;

@Mapper
public abstract class SettingsDtoToSettingsEntityMapper {

    public abstract SettingsEntity settingsDtoToSettingsEntity(SettingsDto settingsDto);

    public ObjectId setObjectId(ObjectId id){
        if(id == null){
            return new ObjectId();
        }

        return id;
    }
}
