import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getColumnList, getRowList } from '../selectors/app';

function Grid(props) {
  const { row, column } = props;
  const [colNo, setColNo] = useState(0);

  useEffect(() => {
    let tmp = 0;

    for(let val of column)
      if(val.show) tmp++;
    
    if(tmp != colNo) setColNo(tmp);
  }, [column])

  return (
    <div className="grid__container">
      <div className="grid">
        <div className="grid__head">
          {
            column.map((val,index) => {
              if(!val.show) return <></>
              
              return (
                <div className="grid__title" style={{width: `${100/colNo}%`}}>
                  {val.label}
                </div>
              )
            })
          }
        </div>
        <div className="grid__body">
          {
            row.map((r) => {
              return column.map((c) => {
                if(!c.show) return <></>

                if(c.value == "date"){
                  let val = new Date(r[c.value]);
                  return (
                    <div className="grid__item" style={{width: `${100/colNo}%`}}>
                      {val.toDateString()}
                    </div>
                  )
                } 
                else if(c.value == "revenue") 
                return (
                  <div className="grid__item" style={{width: `${100/colNo}%`}}>
                    ${Math.floor(r[c.value]/82)}
                  </div>
                )
                else if(c.value == "fill_rate") 
                  return (
                    <div className="grid__item" style={{width: `${100/colNo}%`}}>
                      {Math.floor(r.requests/r.responses)*100}%
                    </div>
                  )
                else if(c.value == "ctr") 
                  return (
                    <div className="grid__item" style={{width: `${100/colNo}%`}}>
                      {Math.floor(r.clicks/r.impressions)*100}%
                    </div>
                  )
                else return (
                  <div className="grid__item" style={{width: `${100/colNo}%`}}>
                    {r[c.value]}
                  </div>
                )
              })
            })
          }
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  row: getRowList(),
  column: getColumnList()
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);