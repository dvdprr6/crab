package com.crab.db;

import io.realm.RealmConfiguration;

public class RealmDb {
    private static RealmConfiguration realmConfiguration = null;
    private static RealmDb realmDb = null;

    private RealmDb(){
        realmConfiguration = new RealmConfiguration.Builder()
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .name("crab")
                .build();
    }

    public static RealmDb getInstance(){
        if(realmConfiguration == null){
            realmDb = new RealmDb();
        }

        return realmDb;
    }

    public RealmConfiguration getRealmConfiguration(){
        return realmConfiguration;
    }
}
