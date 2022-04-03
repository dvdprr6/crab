package com.crab.models.service;

import com.crab.common.mapper.WalletEntityToWalletDetailsMapper;
import com.crab.common.mapper.WalletDtoToWalletEntityMapper;
import com.crab.models.dto.WalletDetailsDto;
import com.crab.models.dto.WalletDto;
import com.crab.models.entities.WalletEntity;
import com.crab.models.repository.WalletRepository;
import com.crab.utils.ModelConverter;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

import org.mapstruct.factory.Mappers;

import java.util.List;
import java.util.stream.Collectors;

public class WalletService {
    private WalletRepository walletRepository;

    public WalletService(){
        walletRepository = new WalletRepository();
    }

    public WritableArray getAllWallets(){
        List<WalletEntity> walletEntityList = walletRepository.getAllWallets();

        WalletEntityToWalletDetailsMapper walletEntityToWalletDtoMapper = Mappers.getMapper(WalletEntityToWalletDetailsMapper.class);

        List<WalletDetailsDto> walletDetailsDtoList = walletEntityList.stream()
                .map(item -> walletEntityToWalletDtoMapper.walletEntityToWalletDetailsDto(item))
                .collect(Collectors.toList());

        WritableArray writableArray = ModelConverter.convertModelToWritableArray(walletDetailsDtoList);

        return writableArray;
    }

    public void upsertWallet(ReadableMap readableMap){
        WalletDto walletDto = ModelConverter.convertReadableMapToModel(readableMap, WalletDto.class);

        WalletDtoToWalletEntityMapper walletDtoToWalletEntityMapper = Mappers.getMapper(WalletDtoToWalletEntityMapper.class);

        WalletEntity walletEntity = walletDtoToWalletEntityMapper.walletDtoToWalletEntity(walletDto);

        walletRepository.upsert(walletEntity);
    }
}
