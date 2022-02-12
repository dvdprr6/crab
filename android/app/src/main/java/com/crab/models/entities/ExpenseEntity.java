package com.crab.models.entities;

import org.bson.types.ObjectId;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.RealmField;
import io.realm.annotations.Required;

@RealmClass(name = "expenses")
public class ExpenseEntity extends RealmObject {
    @PrimaryKey
    @RealmField(name = "_id")
    private ObjectId id;

    @Required
    @RealmField(name = "item_name")
    private String itemName;

    @Required
    @RealmField(name = "item_cost")
    private Float itemCost;

    @Required
    @RealmField(name = "recurring")
    private Boolean recurring;

    public ExpenseEntity() {}

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Float getItemCost() {
        return itemCost;
    }

    public void setItemCost(Float itemCost) {
        this.itemCost = itemCost;
    }

    public Boolean getRecurring() {
        return recurring;
    }

    public void setRecurring(Boolean recurring) {
        this.recurring = recurring;
    }
}
