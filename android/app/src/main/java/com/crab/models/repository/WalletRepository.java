package com.crab.models.repository;

import android.util.Log;

import com.crab.common.mapper.WalletEntityToWalletSchemaMapper;
import com.crab.common.mapper.WalletSchemaToWalletEntityMapper;
import com.crab.db.RealmDb;
import com.crab.models.entities.WalletEntity;
import com.crab.models.schema.WalletSchema;

import org.bson.types.ObjectId;
import org.mapstruct.factory.Mappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class WalletRepository {

    public List<WalletEntity> getAll(){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        List<WalletEntity> walletEntityList = new ArrayList<>();

        try{
            List<WalletSchema> walletSchemaList = realm
                    .where(WalletSchema.class)
                    .findAll()
                    .stream()
                    .collect(Collectors.toList());

            WalletSchemaToWalletEntityMapper walletSchemaToWalletEntityMapper = Mappers.getMapper(WalletSchemaToWalletEntityMapper.class);

            walletEntityList = walletSchemaList.stream()
                    .map(item -> walletSchemaToWalletEntityMapper.walletSchemaToWalletEntity(item))
                    .collect(Collectors.toList());

        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }

        return walletEntityList;
    }

    public WalletEntity getById(ObjectId id){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        WalletEntity walletEntity = null;

        try{
            WalletSchema walletSchema = realm
                    .where(WalletSchema.class)
                    .equalTo("_id", id)
                    .findFirst();

            WalletSchemaToWalletEntityMapper walletSchemaToWalletEntityMapper = Mappers.getMapper(WalletSchemaToWalletEntityMapper.class);
            walletEntity = walletSchemaToWalletEntityMapper.walletSchemaToWalletEntity(walletSchema);
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }

        return walletEntity;
    }

    public WalletEntity getByName(String name){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        WalletEntity walletEntity = null;

        try{
            WalletSchema walletSchema = realm
                    .where(WalletSchema.class)
                    .equalTo("name", name)
                    .findFirst();
            WalletSchemaToWalletEntityMapper walletSchemaToWalletEntityMapper = Mappers.getMapper(WalletSchemaToWalletEntityMapper.class);
            walletEntity = walletSchemaToWalletEntityMapper.walletSchemaToWalletEntity(walletSchema);
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }

        return walletEntity;
    }

    public void upsert(WalletEntity walletEntity){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        WalletEntityToWalletSchemaMapper walletEntityToWalletSchemaMapper = Mappers.getMapper(WalletEntityToWalletSchemaMapper.class);

        WalletSchema walletSchema = walletEntityToWalletSchemaMapper.walletEntityToWalletSchema(walletEntity);

        try{
            realm.executeTransaction(transaction -> transaction.insertOrUpdate(walletSchema));
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }
    }

    public void delete(WalletEntity walletEntity){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        WalletEntityToWalletSchemaMapper walletEntityToWalletSchemaMapper = Mappers.getMapper(WalletEntityToWalletSchemaMapper.class);

        WalletSchema walletSchema = walletEntityToWalletSchemaMapper.walletEntityToWalletSchema(walletEntity);

        try{
            realm.executeTransaction(transaction -> {
                WalletSchema wallet = transaction.where(WalletSchema.class).equalTo("id", walletSchema.getId()).findFirst();
                wallet.getItems().deleteAllFromRealm();
                wallet.deleteFromRealm();
                wallet = null;
            });
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }
    }
}
