import React from 'react';
import RangeSliderInput from './RangeSliderInput';
import styles from '../styles/styles';

const InvestmentInput = ({ handleIncrease, handleManualInput, value, handleDecrease }) =>
  <div className="row form-group">
    <button className="btn btn-default" onClick={handleIncrease} style={styles.rangeButtons}>+</button>
    <div className="col-xs-offset-4 col-xs-3">
      <div className="input-group">
        <span className="input-group-addon">S$</span>
        <input
          className="form-control"
          type="text"
          placeholder="Your investment..."
          onChange={handleManualInput}
          value={value || 0}
          />
      </div>
    </div>
    <button className="btn btn-default" onClick={handleDecrease} style={styles.rangeButtons}>-</button>
    <RangeSliderInput
      handleSlide={handleManualInput}
      cashValue={value || 0}
      minValue={0}
      maxValue={2000000}
      increment={10000}
      />
  </div>

module.exports = InvestmentInput;
