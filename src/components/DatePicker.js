import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getRow as getRowRequest } from '../actions/app';

function DatePicker(props) {
  const { getRow } = props;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDateValid, setIsDateValid] = useState(true);

  const handleSearch = function(){
    if(startDate == "" || endDate == "") {
      setIsDateValid(false);
      return;
    }

    let left = new Date("2021-06-01");
    let rght = new Date("2021-06-31");
    let d1 = new Date(startDate);
    let d2 = new Date(endDate);

    if(
      d1.getTime() < left.getTime() || 
      d2.getTime() < left .getTime() || 
      d1.getTime() > rght.getTime() ||
      d2.getTime() > rght.getTime() ||
      d1.getTime() > d2.getTime()
    ) {
      setIsDateValid(false);
      return;
    }
    
    setIsDateValid(true);

    getRow({startDate, endDate});
  }

  return (
    <div className="datepicker__container">
      <div className="datepicker">
        <div className="datepicker__input-box">
          <p>Start Date</p>
          <input type="date" className="datepicker__input" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="datepicker__input-box">
          <p>End Date</p>
          <input type="date" className="datepicker__input" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="datepicker__input-box">
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
        <br />
        <div className="datepicker__error">
          { !isDateValid ? <p className="text-error">Enter a valid date from 1-June-2021 to 31-June-2021 </p> : "" }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
});

const mapDispatchToProps = (dispatch) => ({
  getRow: (data) => dispatch(getRowRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);