package com.crab.models.repository;

import android.util.Log;

import com.crab.db.RealmDb;
import com.crab.models.entities.SettingsEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class SettingsRepository {

    public List<SettingsEntity> getAll(){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        List<SettingsEntity> settingsEntityList = new ArrayList<>();

        try{
            settingsEntityList = realm
                    .where(SettingsEntity.class)
                    .findAll()
                    .stream()
                    .collect(Collectors.toList());
        }catch(Exception e){
            Log.e("ERROR", e.getMessage());
        }finally {
            realm.close();
        }

        return settingsEntityList;
    }

    public void upsert(SettingsEntity settingsEntity){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        try{
            realm.executeTransaction(transaction -> transaction.insertOrUpdate(settingsEntity));
        }catch(Exception e){
            Log.e("ERROR", e.getMessage());
        }finally {
            realm.close();
        }
    }
}
