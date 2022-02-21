package com.crab.models.entities;

import org.bson.types.ObjectId;

import java.util.Date;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.RealmField;
import io.realm.annotations.Required;

@RealmClass(name = "items")
public class ItemEntity extends RealmObject {
    @PrimaryKey
    @RealmField(name = "_id")
    private ObjectId id;

    @Required
    @RealmField(name = "item_name")
    private String itemName;

    @Required
    @RealmField(name = "amount")
    private Float amount;

    @Required
    @RealmField(name = "recurring")
    private Boolean recurring;

    @Required
    @RealmField(name = "item_type")
    private String itemType;

    @Required
    @RealmField(name = "create_date")
    private Date createDate;

    @Required
    @RealmField(name = "modified_date")
    private Date modifiedDate;

    public ItemEntity() {}

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

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Boolean getRecurring() {
        return recurring;
    }

    public void setRecurring(Boolean recurring) {
        this.recurring = recurring;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
}
