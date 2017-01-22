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

const CalculatorContainer = () => <div>Hello World!</div>;

ReactDOM.render(
  <CalculatorContainer />,
  document.getElementById('app')
);
