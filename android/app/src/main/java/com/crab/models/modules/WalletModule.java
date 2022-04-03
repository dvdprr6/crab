package com.crab.models.modules;

import androidx.annotation.NonNull;

import com.crab.models.service.WalletService;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;

public class WalletModule extends ReactContextBaseJavaModule {
    private WalletService walletService;

    public WalletModule(ReactApplicationContext reactContext){
        super(reactContext);
        walletService = new WalletService();
    }

    @NonNull
    @Override
    public String getName() {
        return "Wallet";
    }

    @ReactMethod
    public void getAllWallets(Promise promise){
        WritableArray writableArray = walletService.getAllWallets();
        promise.resolve(writableArray);
    }

    @ReactMethod
    public void upsertWallet(ReadableMap readableMap, Promise promise){
        walletService.upsertWallet(readableMap);
        WritableArray writableArray = walletService.getAllWallets();
        promise.resolve(writableArray);
    }
}
