package com.crab.models.repository;

import android.util.Log;

import com.crab.common.mapper.ItemEntityToItemSchemaMapper;
import com.crab.common.mapper.ItemSchemaToItemEntityMapper;
import com.crab.db.RealmDb;
import com.crab.models.entities.ItemEntity;
import com.crab.models.schema.ItemSchema;

import org.bson.types.ObjectId;
import org.mapstruct.factory.Mappers;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class ItemRepository {
    public List<ItemEntity> getItemsByDateRange(ObjectId objectId, Date fromDate, Date toDate){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        List<ItemEntity> itemEntityList = new ArrayList<>();

        try{
            List<ItemSchema> itemSchemaList = realm
                    .where(ItemSchema.class)
                    .equalTo("wallet._id", objectId)
                    .between("create_date", fromDate, toDate)
                    .findAll()
                    .stream()
                    .collect(Collectors.toList());

            ItemSchemaToItemEntityMapper itemSchemaToItemEntityMapper = Mappers.getMapper(ItemSchemaToItemEntityMapper.class);

            itemEntityList = itemSchemaList.stream()
                    .map(item -> itemSchemaToItemEntityMapper.itemSchemaToItemEntity(item))
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

        ItemEntityToItemSchemaMapper itemEntityToItemSchemaMapper = Mappers.getMapper(ItemEntityToItemSchemaMapper.class);

        ItemSchema itemSchema = itemEntityToItemSchemaMapper.itemEntityToItemSchema(itemEntity);

        try{
            realm.executeTransaction(transaction -> transaction.insertOrUpdate(itemSchema));
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }
    }

    public void delete(ItemEntity itemEntity){
        RealmConfiguration realmConfiguration = RealmDb.getInstance().getRealmConfiguration();
        Realm realm = Realm.getInstance(realmConfiguration);

        ItemEntityToItemSchemaMapper itemEntityToItemSchemaMapper = Mappers.getMapper(ItemEntityToItemSchemaMapper.class);

        ItemSchema itemSchema = itemEntityToItemSchemaMapper.itemEntityToItemSchema(itemEntity);

        try{
            realm.executeTransaction(transaction -> {
                ItemSchema item = transaction.where(ItemSchema.class).equalTo("id", itemSchema.getId()).findFirst();
                item.deleteFromRealm();
                item = null;
            });
        }catch(Exception e){
            Log.e("REALMDB", e.getMessage());
        }finally {
            realm.close();
        }
    }
}
