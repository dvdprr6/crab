package com.crab.models.schema;

import org.bson.types.ObjectId;

import java.util.Date;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.RealmField;
import io.realm.annotations.Required;

@RealmClass(name = "wallet")
public class WalletSchema extends RealmObject {
    @PrimaryKey
    @RealmField(name = "_id")
    private ObjectId id;

    @Required
    @RealmField(name = "name")
    private String name;

    @Required
    @RealmField(name = "create_date")
    private Date createDate;

    private RealmList<ItemSchema> items;

    public WalletSchema() {}

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

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public RealmList<ItemSchema> getItems() {
        return items;
    }

    public void setItems(RealmList<ItemSchema> items) {
        this.items = items;
    }
}
