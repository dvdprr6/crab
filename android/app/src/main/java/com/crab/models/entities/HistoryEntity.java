package com.crab.models.entities;

import org.bson.types.ObjectId;

import io.realm.RealmList;
import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;
import io.realm.annotations.RealmClass;
import io.realm.annotations.RealmField;
import io.realm.annotations.Required;

@RealmClass(name = "history")
public class HistoryEntity extends RealmObject {
    @PrimaryKey
    @RealmField(name = "_id")
    private ObjectId id;

    @Required
    @RealmField(name = "budget")
    private Float budget;

    @Required
    @RealmField(name = "spending")
    private Float spending;

    @Required
    @RealmField(name = "month")
    private String month;

    @Required
    @RealmField(name = "year")
    private String year;

    private RealmList<ExpenseEntity> expenses;

    public HistoryEntity() {}

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public Float getBudget() {
        return budget;
    }

    public void setBudget(Float budget) {
        this.budget = budget;
    }

    public Float getSpending() {
        return spending;
    }

    public void setSpending(Float spending) {
        this.spending = spending;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public RealmList<ExpenseEntity> getExpenses() {
        return expenses;
    }

    public void setExpenses(RealmList<ExpenseEntity> expenses) {
        this.expenses = expenses;
    }
}
