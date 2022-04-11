package com.crab.models.service;

import com.crab.common.mapper.WalletEntityToWalletDetailsMapper;
import com.crab.common.mapper.WalletDtoToWalletEntityMapper;
import com.crab.common.mapper.WalletItemDtoToWalletEntityMapper;
import com.crab.models.dto.WalletDetailsDto;
import com.crab.models.dto.WalletDto;
import com.crab.models.dto.WalletItemDto;
import com.crab.models.entities.WalletEntity;
import com.crab.models.repository.WalletRepository;
import com.crab.utils.Constants;
import com.crab.utils.ModelConverter;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

import org.bson.types.ObjectId;
import org.mapstruct.factory.Mappers;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Collectors;

public class WalletService {
    private WalletRepository walletRepository;

    public WalletService(){
        walletRepository = new WalletRepository();
    }

    public WritableArray getAllWallets(){
        List<WalletEntity> walletEntityList = walletRepository.getAll();

        WalletEntityToWalletDetailsMapper walletEntityToWalletDtoMapper = Mappers.getMapper(WalletEntityToWalletDetailsMapper.class);

        List<WalletDetailsDto> walletDetailsDtoList = walletEntityList.stream()
                .map(item -> walletEntityToWalletDtoMapper.walletEntityToWalletDetailsDto(item))
                .collect(Collectors.toList());

        WritableArray writableArray = ModelConverter.convertModelToWritableArray(walletDetailsDtoList);

        return writableArray;
    }

    public void createWallet(ReadableMap readableMap){
        WalletDto walletDto = ModelConverter.convertReadableMapToModel(readableMap, WalletDto.class);

        WalletDtoToWalletEntityMapper walletDtoToWalletEntityMapper = Mappers.getMapper(WalletDtoToWalletEntityMapper.class);

        WalletEntity walletEntity = walletDtoToWalletEntityMapper.walletDtoToWalletEntity(walletDto);

        walletRepository.upsert(walletEntity);
    }

    public void updateWallet(ReadableMap readableMap){
        WalletDto walletDto = ModelConverter.convertReadableMapToModel(readableMap, WalletDto.class);
        WalletDtoToWalletEntityMapper walletDtoToWalletEntityMapper = Mappers.getMapper(WalletDtoToWalletEntityMapper.class);

        ObjectId objectId = new ObjectId(walletDto.getId());

        WalletEntity originalWalletEntity = walletRepository.getById(objectId);

        WalletEntity walletEntity = walletDtoToWalletEntityMapper.walletDtoToWalletEntity(walletDto);
        walletEntity.getItems().addAll(originalWalletEntity.getItems());

        walletRepository.upsert(walletEntity);
    }

    public void updateWalletWithItem(ReadableMap readableMap){
        WalletItemDto walletItemDto = ModelConverter.convertReadableMapToModel(readableMap, WalletItemDto.class);
        WalletItemDtoToWalletEntityMapper walletItemDtoToWalletEntityMapper = Mappers.getMapper(WalletItemDtoToWalletEntityMapper.class);

        WalletEntity walletEntity = walletItemDtoToWalletEntityMapper.walletItemDtoToWalletEntity(walletItemDto);

        ObjectId objectId = new ObjectId(walletEntity.getId());

        WalletEntity originalWalletEntity = walletRepository.getById(objectId);

        walletEntity.getItems().addAll(originalWalletEntity.getItems());

        walletRepository.upsert(walletEntity);
    }

    public void deleteWallet(ReadableMap readableMap){
        WalletDto walletDto = ModelConverter.convertReadableMapToModel(readableMap, WalletDto.class);

        ObjectId objectId = new ObjectId(walletDto.getId());

        WalletEntity walletEntity = walletRepository.getById(objectId);

        WalletEntity unassignedWalletEntity = walletRepository.getByName(Constants.UNASSIGNED_WALLET);

        Calendar calendar = Calendar.getInstance();
        String createDate = calendar.getTime().toString();

        if(unassignedWalletEntity == null){
            WalletEntity walletEntityNew = new WalletEntity();
            walletEntityNew.setName(Constants.UNASSIGNED_WALLET);
            walletEntityNew.setCreateDate(createDate);

            walletEntity.getItems()
                    .stream()
                    .forEach(item -> {
                        item.setId(null);
                        item.setCreateDate(createDate);
                    });

            walletEntityNew.getItems().addAll(walletEntity.getItems());

            walletRepository.upsert(walletEntityNew);
        }else{
            walletEntity.getItems()
                    .stream()
                    .forEach(item -> {
                        item.setId(null);
                        item.setCreateDate(createDate);
                    });
            
            unassignedWalletEntity.getItems().addAll(walletEntity.getItems());

            walletRepository.upsert(unassignedWalletEntity);
        }

        walletRepository.delete(walletEntity);

    }
}
