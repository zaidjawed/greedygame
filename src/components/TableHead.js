import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getColumnList } from '../selectors/app';

function TableHead() {
  return (
    <div></div>
  )
}

const mapStateToProps = createStructuredSelector({
  column: getColumnList()
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TableHead);