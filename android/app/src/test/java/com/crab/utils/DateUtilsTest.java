package com.crab.utils;

import org.junit.Test;

import java.util.Calendar;

public class DateUtilsTest {

    @Test
    public void getBeginningOfMonthTest(){
        Calendar calendar = Calendar.getInstance();

        int beginningOfMonth = calendar.getActualMinimum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, beginningOfMonth);
        calendar.set(Calendar.HOUR, -12);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        String expected = calendar.getTime().toString();

        String actual = DateUtils.beginningOfMonth().toString();

        assert(actual.equals(expected));
    }

    @Test
    public void getEndOfMonthTest(){
        Calendar calendar = Calendar.getInstance();

        int endOfMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, endOfMonth);
        calendar.set(Calendar.HOUR, 11);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);

        String expected = calendar.getTime().toString();
        String actual = DateUtils.endOfMonth().toString();

        assert(actual.equals(expected));
    }

    @Test
    public void getCurrentDateTest(){
        String currentDate = DateUtils.currentDate().toString();

        assert(currentDate != null);
    }
}
