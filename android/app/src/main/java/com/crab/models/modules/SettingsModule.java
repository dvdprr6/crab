package com.crab.models.modules;

import androidx.annotation.NonNull;

import com.crab.models.service.SettingsService;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;

public class SettingsModule extends ReactContextBaseJavaModule {
    private SettingsService settingsService;

    public SettingsModule(ReactApplicationContext reactContext){
        super(reactContext);
        settingsService = new SettingsService();
    }

    @NonNull
    @Override
    public String getName() {
        return "settings";
    }

    @ReactMethod
    public void getSettings(Promise promise){
        WritableArray writableArray = settingsService.getSettings();
        promise.resolve(promise);
    }
}
