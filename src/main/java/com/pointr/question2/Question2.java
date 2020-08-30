package com.pointr.question2;

public class Question2 {
    private static long divider = System.currentTimeMillis() % 1000000;

    public static int rollDice() {
        long time = System.currentTimeMillis();
        int rand = Math.toIntExact((time / divider) % 6);
        divider = Math.abs(divider - time / divider);
        return rand + 1;
    }
}
