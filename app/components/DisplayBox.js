import React from 'react';
import Numeral from 'numeral';
import styles from '../styles/styles';

const DisplayBox = ({ fee }) =>
  <h3 className="col-xs-4" style={styles.displayBox}>S${Numeral(`${fee}`).format('0,0.00')}</h3>


module.exports = DisplayBox;
