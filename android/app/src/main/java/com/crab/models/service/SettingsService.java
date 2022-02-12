package com.crab.models.service;

import com.crab.common.mapper.SettingsEntityToSettingsDtoMapper;
import com.crab.models.dto.SettingsDto;
import com.crab.models.entities.SettingsEntity;
import com.crab.models.repository.SettingsRepository;
import com.crab.utils.ModelConverter;
import com.facebook.react.bridge.WritableArray;

import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

public class SettingsService {
    private SettingsRepository settingsRepository;

    public SettingsService(){
        settingsRepository = new SettingsRepository();
    }

    public WritableArray getSettings(){
        List<SettingsEntity> settingsEntityList = settingsRepository.getAll();

        SettingsEntityToSettingsDtoMapper settingsEntityToSettingsDtoMapper = Mappers.getMapper(SettingsEntityToSettingsDtoMapper.class);

        List<SettingsDto> settingsDtoList = settingsEntityList.stream()
                .map(item -> settingsEntityToSettingsDtoMapper.settingsEntityToSettingsDto(item))
                .collect(Collectors.toList());

        WritableArray writableArray = ModelConverter.convertModelToWritableArray(settingsDtoList);

        return writableArray;
    }
}
