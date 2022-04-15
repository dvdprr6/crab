package com.crab.models.dto;

import java.util.List;

/**
 * Display to Transaction Page
 */
public class ItemDetailsDto {
    private String status;
    private Float totalExpense;
    private Float totalRevenue;
    private Float totalSavings;
    private List<ItemDto> items;

    public ItemDetailsDto() {}

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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

    public List<ItemDto> getItems() {
        return items;
    }

    public void setItems(List<ItemDto> items) {
        this.items = items;
    }
}
