/*
  React Components should be:
  --> F - ocussed
  --> I - ndependent
  --> R - eusable
  --> S - mall
  --> T - estable
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Numeral from 'numeral';

// import CashInput from './components/CashInput';
import CurrentFees from './config/currentFees';

const PeriodOfYears = 20;
const AverageInvestmentYield = 0.05;

const CalculatorContainer = React.createClass({
  getInitialState() {
    return {
      initialCashValue: '',
      feesCharged: {
        stashAway: '',
        advisors: ''
      },
      savings: ''
    };
  },

  calculateAnnualStashAwayFeesCharged(value) {
    let totalFeeCharged = 0;
    // ------------ First £25,000
    if (value < 25000) {
      totalFeeCharged = value * CurrentFees.stashAway.first25k;
    // ------------ Next £25,000
    } else if ( (value > 25000) && (value <= 50000) ) {
      totalFeeCharged = 25000 * CurrentFees.stashAway.first25k;
      totalFeeCharged += (value - 25000) * CurrentFees.stashAway.next25k;
    // ------------ Next £50,000
    } else if ( (value > 50000) && (value <= 100000) ) {
      totalFeeCharged = 25000 * CurrentFees.stashAway.first25k;
      totalFeeCharged += 25000 * CurrentFees.stashAway.next25k;
      totalFeeCharged += (value - 50000) * CurrentFees.stashAway.next50k;
    // ------------ Next £150,000
    } else if ( (value > 100000) && (value <= 250000) ) {
      totalFeeCharged = 25000 * CurrentFees.stashAway.first25k;
      totalFeeCharged += 25000 * CurrentFees.stashAway.next25k;
      totalFeeCharged += 50000 * CurrentFees.stashAway.next50k;
      totalFeeCharged += (value - 100000) * CurrentFees.stashAway.next150k;
    // ------------ Next £250,000
    } else if ( (value > 250000) && (value <= 500000) ) {
      totalFeeCharged = 25000 * CurrentFees.stashAway.first25k;
      totalFeeCharged += 25000 * CurrentFees.stashAway.next25k;
      totalFeeCharged += 50000 * CurrentFees.stashAway.next50k;
      totalFeeCharged += 100000 * CurrentFees.stashAway.next150k;
      totalFeeCharged += (value - 250000) * CurrentFees.stashAway.next250k;
    // ------------ Next £500,000
    } else if ( (value > 250000) && (value <= 1000000) ) {
      totalFeeCharged = 25000 * CurrentFees.stashAway.first25k;
      totalFeeCharged += 25000 * CurrentFees.stashAway.next25k;
      totalFeeCharged += 50000 * CurrentFees.stashAway.next50k;
      totalFeeCharged += 100000 * CurrentFees.stashAway.next150k;
      totalFeeCharged += 250000 * CurrentFees.stashAway.next250k;
      totalFeeCharged += (value - 500000) * CurrentFees.stashAway.next500k;
    // ------------ Over £1million
    } else if (value > 1000000) {
      totalFeeCharged = 25000 * CurrentFees.stashAway.first25k;
      totalFeeCharged += 25000 * CurrentFees.stashAway.next25k;
      totalFeeCharged += 50000 * CurrentFees.stashAway.next50k;
      totalFeeCharged += 100000 * CurrentFees.stashAway.next150k;
      totalFeeCharged += 250000 * CurrentFees.stashAway.next250k;
      totalFeeCharged += 500000 * CurrentFees.stashAway.next500k;
      totalFeeCharged += (value - 1000000) * CurrentFees.stashAway.above1m;
    }

    return totalFeeCharged;
  },

  calculateAnnualTraditionalAdvisorFeesCharged(value) {
    let totalFeeCharged = 0;
    totalFeeCharged += value * CurrentFees.traditionalAdvisors.initialFee;
    totalFeeCharged += (value - totalFeeCharged) * CurrentFees.traditionalAdvisors.annualFee;
    return totalFeeCharged;
  },

  calculateTotalSavingsMade(value, periodOfYears) {
    let totalValue = value;
    let totalSavings = 0;
    for (let years = 1; years < periodOfYears; years++) {
      const totalYield = this.calculateAnnualInvestmentYield(totalValue);
      totalValue += totalYield
      const stashAwayFees = this.calculateAnnualStashAwayFeesCharged(totalValue);
      const traditionalAdvisorsFees = this.calculateAnnualTraditionalAdvisorFeesCharged(totalValue);
      totalSavings += (traditionalAdvisorsFees - stashAwayFees);
    }
    return totalSavings;
  },

  calculateAnnualInvestmentYield(value) {
    return value * AverageInvestmentYield;
  },

  updateAllValues(event) {
    this.setState({
      initialCashValue: Numeral(event.target.value)._value,
      feesCharged: {
        stashAway: this.calculateAnnualStashAwayFeesCharged(Numeral(event.target.value)._value),
        advisors: this.calculateAnnualTraditionalAdvisorFeesCharged(Numeral(event.target.value)._value)
      },
      savings: this.calculateTotalSavingsMade(Numeral(event.target.value)._value, PeriodOfYears)
    });

  },

  render() {
    return (
      <div className="col-xs-offset-2 col-xs-8 jumbotron">
        <p className="lead text-center">Enter an investment amount to see how much you save in fees compared to traditional advisors.</p>
        <div className="row form-group">
          <input
            className="form-control"
            type="text"
            onChange={this.updateAllValues}
            value={this.state.initialCashValue}
          />
        </div>
        <div className="row bg-success text-center text-info">
          <div className="row">
            <span className="col-xs-4 small">StashAway's fees</span>
            <span className="col-xs-4 small">Traditional advisor's fees (first year)</span>
            <span className="col-xs-4 small">{`Total savings on fees over ${PeriodOfYears} years`}</span>
          </div>
          <div className="row">
            <h3 className="col-xs-4">{`$${Numeral(this.state.feesCharged.stashAway).format('0,0.00')}`}</h3>
            <h3 className="col-xs-4">{`$${Numeral(this.state.feesCharged.advisors).format('0,0.00')}`}</h3>
            <h3 className="col-xs-4">{`$${Numeral(this.state.savings).format('0,0.00')}`}</h3>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <CalculatorContainer />,
  document.getElementById('app')
);
