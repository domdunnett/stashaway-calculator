import React from 'react';
import styles from '../styles/styles';

const RangeSliderInput = ({ handleSlide, cashValue, minValue, maxValue, increment }) =>
  <input
    style={styles.rangeSlider}
    type="range"
    onChange={handleSlide}
    value={cashValue}
    min={minValue}
    max={maxValue}
    step={increment}
  />

module.exports = RangeSliderInput;
