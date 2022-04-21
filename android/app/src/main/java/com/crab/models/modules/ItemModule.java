package com.crab.models.modules;

import androidx.annotation.NonNull;

import com.crab.models.service.ItemService;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;

public class ItemModule extends ReactContextBaseJavaModule {
    private ItemService itemService;

    public ItemModule(ReactApplicationContext reactContext){
        super(reactContext);
        itemService = new ItemService();
    }

    @NonNull
    @Override
    public String getName() {
        return "Item";
    }

    @ReactMethod
    public void getMonthToDateItemsById(String walletId, Promise promise){
        WritableMap writableMap = itemService.monthToDateItems(walletId);
        promise.resolve(writableMap);
    }

    @ReactMethod
    public void getYearToDateItemsById(String walletId, Promise promise){
        WritableMap writableMap = itemService.yearToDateItems(walletId);
        promise.resolve(writableMap);
    }

    @ReactMethod
    public void upsertItem(ReadableMap readableMap, Promise promise){
        itemService.upsertItem(readableMap);
        promise.resolve("");
    }

    @ReactMethod
    public void deleteItem(ReadableMap readableMap, Promise promise){
        itemService.deleteItem(readableMap);
        promise.resolve("");
    }
}
