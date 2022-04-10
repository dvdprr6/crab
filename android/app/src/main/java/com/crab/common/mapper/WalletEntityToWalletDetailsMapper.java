package com.crab.common.mapper;

import com.crab.models.dto.WalletDetailsDto;
import com.crab.models.entities.ItemEntity;
import com.crab.models.entities.WalletEntity;
import com.crab.utils.Constants;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper
public abstract class WalletEntityToWalletDetailsMapper{

    @Mapping(source = "items", target = "totalExpense", qualifiedByName = { "getTotalExpenses" })
    @Mapping(source = "items", target = "totalRevenue", qualifiedByName = { "getTotalRevenue" })
    @Mapping(source = "items", target = "totalSavings", qualifiedByName = { "getTotalSavings" })
    public abstract WalletDetailsDto walletEntityToWalletDetailsDto(WalletEntity walletEntity);

    @Named("getTotalExpenses")
    public Float getTotalExpenses(List<ItemEntity> items){
        Float totalExpenses = calculateTotalExpenses(items);
        return totalExpenses;
    }

    @Named("getTotalRevenue")
    public Float getTotalRevenue(List<ItemEntity> items){
        Float totalSavings = calculateTotalRevenue(items);
        return totalSavings;
    }

    @Named("getTotalSavings")
    public Float getTotalSavings(List<ItemEntity> items){
        Float totalExpenses = calculateTotalExpenses(items);
        Float totalRevenue = calculateTotalRevenue(items);

        Float totalSavings = totalRevenue - totalExpenses;

        return totalSavings;
    }

    private Float calculateTotalExpenses(List<ItemEntity> items){
        Float totalExpenses = items.stream()
                .filter(item -> item.getType().equals(Constants.ITEM_TYPE_EXPENSE))
                .map(item -> item.getAmount())
                .reduce(0f, (a, b) -> a + b)
                .floatValue();

        return totalExpenses;
    }

    private Float calculateTotalRevenue(List<ItemEntity> items){
        Float totalExpenses = items.stream()
                .filter(item -> item.getType().equals(Constants.ITEM_TYPE_REVENUE))
                .map(item -> item.getAmount())
                .reduce(0f, (a, b) -> a + b)
                .floatValue();

        return totalExpenses;
    }
}
