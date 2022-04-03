package com.crab.models.dto;

public class WalletDetailsDto {
    private String id;
    private String name;
    private Float totalExpense;
    private Float totalRevenue;
    private Float totalSavings;
    private String createDate;

    public WalletDetailsDto(){}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Float totalExpense) {
        this.totalExpense = totalExpense;
    }

    public Float getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Float totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Float getTotalSavings() {
        return totalSavings;
    }

    public void setTotalSavings(Float totalSavings) {
        this.totalSavings = totalSavings;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }
}
