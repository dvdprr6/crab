package com.crab.models.schema;

import org.bson.types.ObjectId;

import java.util.Date;

import io.realm.RealmObject;
import io.realm.RealmResults;
import io.realm.annotations.LinkingObjects;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.RealmField;
import io.realm.annotations.Required;

@RealmClass(name = "item")
public class ItemSchema extends RealmObject {
    @PrimaryKey
    @RealmField(name = "_id")
    private ObjectId id;

    @Required
    @RealmField(name = "name")
    private String name;

    @Required
    @RealmField(name = "amount")
    private Float amount;

    @Required
    @RealmField(name = "recurring")
    private Boolean recurring;

    @Required
    @RealmField(name = "type")
    private String type;

    @Required
    @RealmField(name = "create_date")
    private Date createDate;

    @LinkingObjects("items")
    private final RealmResults<WalletSchema> wallet = null;

    public ItemSchema() {}

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public RealmResults<WalletSchema> getWallet() {
        return wallet;
    }
}
