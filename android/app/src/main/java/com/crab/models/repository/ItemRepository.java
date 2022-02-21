package com.crab.models.repository;

import android.util.Log;

import com.crab.db.RealmDb;
import com.crab.models.entities.ItemEntity;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class ItemRepository {
    public List<ItemEntity> getItemsByDateRange(Date fromDate, Date toDate){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        List<ItemEntity> itemEntityList = new ArrayList<>();

        try{
            itemEntityList = realm
                    .where(ItemEntity.class)
                    .between("create_date", fromDate, toDate)
                    .findAll()
                    .stream()
                    .collect(Collectors.toList());
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }

        return itemEntityList;
    }

    public void upsert(ItemEntity itemEntity){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        try{
            realm.executeTransaction(transaction -> transaction.insertOrUpdate(itemEntity));
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }
    }
}
