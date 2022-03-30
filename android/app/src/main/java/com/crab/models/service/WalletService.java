package com.crab.models.service;

import com.crab.common.mapper.WalletEntityToWalletDtoMapper;
import com.crab.models.dto.WalletDto;
import com.crab.models.entities.WalletEntity;
import com.crab.models.repository.WalletRepository;
import com.crab.utils.ModelConverter;
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

        WalletEntityToWalletDtoMapper walletEntityToWalletDtoMapper = Mappers.getMapper(WalletEntityToWalletDtoMapper.class);

        List<WalletDto> walletDtoList = walletEntityList.stream()
                .map(item -> walletEntityToWalletDtoMapper.walletEntityToWalletDto(item))
                .collect(Collectors.toList());

        WritableArray writableArray = ModelConverter.convertModelToWritableArray(walletDtoList);

        return writableArray;
    }
}
