package com.crab.models.repository;

import android.util.Log;

import com.crab.db.RealmDb;
import com.crab.models.entities.WalletEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class WalletRepository {

    public List<WalletEntity> getAllWallets(){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        List<WalletEntity> walletEntityList = new ArrayList<>();

        try{
            List<WalletEntity> walletEntityRealm = realm
                    .where(WalletEntity.class)
                    .findAll()
                    .stream()
                    .collect(Collectors.toList());

            for(WalletEntity wallet : walletEntityRealm){
                WalletEntity walletEntity = new WalletEntity();
                walletEntity.setId(wallet.getId());
                walletEntity.setName(wallet.getName());
                walletEntity.setCreateDate(wallet.getCreateDate());
            }

        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }

        return walletEntityList;
    }
}
