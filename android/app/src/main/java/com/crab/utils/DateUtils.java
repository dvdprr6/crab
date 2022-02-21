package com.crab.utils;

import java.util.Calendar;
import java.util.Date;

public class DateUtils {
    public static Date beginningOfMonth(){
        Calendar calendar = Calendar.getInstance();

        int beginningOfMonth = calendar.getActualMinimum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, beginningOfMonth);
        calendar.set(Calendar.HOUR, -12); // -12 = 00:00:00
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);

        return calendar.getTime();
    }

    public static Date endOfMonth(){
        Calendar calendar = Calendar.getInstance();

        int endOfMonth = calendar.getActualMaximum(Calendar.DAY_OF_MONTH);

        calendar.set(Calendar.DAY_OF_MONTH, endOfMonth);
        calendar.set(Calendar.HOUR, 11); // 11 = 23:59:59
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        calendar.set(Calendar.MILLISECOND, 999);

        return calendar.getTime();
    }

    public static Date currentDate(){
        Calendar calendar = Calendar.getInstance();

        return calendar.getTime();
    }
}
