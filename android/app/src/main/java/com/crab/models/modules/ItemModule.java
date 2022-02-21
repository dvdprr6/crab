package com.crab.models.modules;

import androidx.annotation.NonNull;

import com.crab.models.service.ItemService;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

public class ItemModule extends ReactContextBaseJavaModule {
    private ItemService itemService;
    private ReactContext reactContext;

    public ItemModule(ReactApplicationContext reactContext){
        super(reactContext);
        itemService = new ItemService();
    }

    @NonNull
    @Override
    public String getName() {
        return "ItemModule";
    }

    @ReactMethod
    public void getMonthToDateItems(Promise promise){
        WritableArray writableArray = itemService.monthToDateItems();
        promise.resolve(writableArray);
    }
}
