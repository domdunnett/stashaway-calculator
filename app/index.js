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

// import CashInput from './components/CashInput';

const CalculatorContainer = React.createClass({
  getInitialState() {
    return {
      initialCashValue: '',
      fees: {
        stashAway: '',
        advisors: ''
      },
      savings: ''
    };
  },

  updateCashValue(event) {
    this.setState({
      initialCashValue: event.target.value,
      fees: {
        stashAway: `${event.target.value*0.08}`,
        advisors: `${event.target.value*0.5}`
      }
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
            onChange={this.updateCashValue}
            value={this.state.initialCashValue}
          />
        </div>
        <div className="row bg-success text-center text-info">
          <div className="row">
            <span className="col-xs-4 small">StashAway's fees</span>
            <span className="col-xs-4 small">Traditional advisor's fees (first year)</span>
            <span className="col-xs-4 small">Total savings on fees over 20 years</span>
          </div>
          <div className="row">
            <h3 className="col-xs-4">{`${this.state.fees.stashAway}`}</h3>
            <h3 className="col-xs-4">{`${this.state.fees.advisors}`}</h3>
            <h3 className="col-xs-4">{`${this.state.savings}`}</h3>
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
