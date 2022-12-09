import React from 'react';
import DatePicker from '../components/DatePicker';
import Filter from '../components/Filter';
import Grid from '../components/Grid';

export default function Analytics(props) {
  return (
    <div className="analytics__container">
      <div className="analytics">
        <DatePicker />
        <Filter />
        <Grid />
      </div>
    </div>
  )
}