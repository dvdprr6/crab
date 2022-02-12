package com.crab.utils;

import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;
import java.util.List;

public class ModelConverter {

    public static <T> WritableMap convertModelToWritableMap(T model) {
        ObjectMapper mapper = new ObjectMapper();
        WritableMap writableMap = new WritableNativeMap();

        try{
            String json = mapper.writeValueAsString(model);
            JSONObject jsonObject = new JSONObject(json);

            writableMap = toWritableMap(jsonObject);

        }catch(JsonProcessingException | JSONException e){
            e.printStackTrace();
        }

        return writableMap;
    }

    public static <T> WritableArray convertModelToWritableArray(List<T> list){
        ObjectMapper mapper = new ObjectMapper();
        WritableArray writableArray = new WritableNativeArray();

        for(T t : list){
            try {
                String json = mapper.writeValueAsString(t);
                JSONObject jsonObject = new JSONObject(json);

                WritableMap writableMap = toWritableMap(jsonObject);

                writableArray.pushMap(writableMap);
            } catch (JsonProcessingException | JSONException e) {
                e.printStackTrace();
            }
        }

        return writableArray;
    }

    private static WritableMap toWritableMap(JSONObject jsonObject) throws JSONException {
        WritableMap writableMap = new WritableNativeMap();

        Iterator<String> iterator = jsonObject.keys();

        while(iterator.hasNext()){
            String key = iterator.next();
            Object value = jsonObject.get(key);
            if (value instanceof JSONObject) {
                writableMap.putMap(key, toWritableMap((JSONObject) value));
            }else if(value instanceof JSONArray){
                writableMap.putArray(key, toWritableArray((JSONArray) value));
            } else if (value instanceof Boolean) {
                writableMap.putBoolean(key, (Boolean) value);
            } else if (value instanceof Integer) {
                writableMap.putInt(key, (Integer) value);
            } else if (value instanceof Double) {
                writableMap.putDouble(key, (Double) value);
            } else if (value instanceof String) {
                writableMap.putString(key, (String) value);
            }else{
                writableMap.putString(key, value.toString());
            }
        }

        return writableMap;
    }

    private static WritableArray toWritableArray(JSONArray jsonArray) throws JSONException{
        WritableArray writableArray = new WritableNativeArray();

        for(int i = 0; i < jsonArray.length(); i++){
            Object value = jsonArray.get(i);
            if (value instanceof JSONObject) {
                writableArray.pushMap(toWritableMap((JSONObject) value));
            } else if (value instanceof  JSONArray) {
                writableArray.pushArray(toWritableArray((JSONArray) value));
            } else if (value instanceof  Boolean) {
                writableArray.pushBoolean((Boolean) value);
            } else if (value instanceof  Integer) {
                writableArray.pushInt((Integer) value);
            } else if (value instanceof  Double) {
                writableArray.pushDouble((Double) value);
            } else if (value instanceof String)  {
                writableArray.pushString((String) value);
            } else {
                writableArray.pushString(value.toString());
            }
        }

        return writableArray;
    }
}
