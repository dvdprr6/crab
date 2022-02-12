package com.crab.models.dto;

public class SettingsDto {
    private String id;
    private Float budget;

    public SettingsDto(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Float getBudget() {
        return budget;
    }

    public void setBudget(Float budget) {
        this.budget = budget;
    }
}