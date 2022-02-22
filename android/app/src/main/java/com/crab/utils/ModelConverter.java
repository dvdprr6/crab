package com.crab.utils;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
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

    public static <DTO> DTO convertReadableMapToModel(ReadableMap readableMap, Class<DTO> dtoClazz) {
        ObjectMapper mapper = new ObjectMapper();
        DTO dto = null;

        try{
            JSONObject json = toJsonObject(readableMap);
            dto = mapper.readValue(json.toString(), dtoClazz);
        }catch(JSONException e){
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return dto;
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

    private static JSONObject toJsonObject(ReadableMap readableMap) throws JSONException{
        JSONObject json = new JSONObject();
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            switch (readableMap.getType(key)) {
                case Null:
                    json.put(key, JSONObject.NULL);
                    break;
                case Boolean:
                    json.put(key, readableMap.getBoolean(key));
                    break;
                case Number:
                    json.put(key, readableMap.getDouble(key));
                    break;
                case String:
                    json.put(key, readableMap.getString(key));
                    break;
                case Map:
                    json.put(key, toJsonObject(readableMap.getMap(key)));
                    break;
                case Array:
                    json.put(key, toJsonArray(readableMap.getArray(key)));
                    break;
            }
        }
        return json;
    }

    private static JSONArray toJsonArray(ReadableArray readableArray) throws JSONException {
        JSONArray array = new JSONArray();
        for (int i = 0; i < readableArray.size(); i++) {
            switch (readableArray.getType(i)) {
                case Null:
                    break;
                case Boolean:
                    array.put(readableArray.getBoolean(i));
                    break;
                case Number:
                    array.put(readableArray.getDouble(i));
                    break;
                case String:
                    array.put(readableArray.getString(i));
                    break;
                case Map:
                    array.put(toJsonObject(readableArray.getMap(i)));
                    break;
                case Array:
                    array.put(toJsonArray(readableArray.getArray(i)));
                    break;
            }
        }
        return array;
    }
}
