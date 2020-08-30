package com.pointr.question2;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class Question2Tests {

    @Test
    public void rollDice_ShouldGiveIntegerBetweenOneAndSix() {
        assertThat(Question2.rollDice()).isBetween(1, 6);
    }

    /*@Test
    public void rollDice_ShouldGiveAllIntegerBetweenOneAndSix_OnSixtyRoll() {
        boolean[] rolls = new boolean[6];

        for (int i = 0; i < 60; i++) {
            rolls[Question2.rollDice() - 1] = true;
        }

        assertTrue(Arrays.equals(rolls, new boolean[]{true, true, true, true, true, true}));
    }

    @Test
    public void rollDice_ShouldGiveResultUniformly() {
        int[] rolls = new int[6];

        for (int i = 0; i < 60000; i++) {
            Integer roll = Question2.rollDice();
            rolls[ roll - 1]++;
        }

        for (int i = 0; i < rolls.length; i++) {
            assertThat(rolls[i]).isBetween(9000, 11000);
        }

    }*/

}
