import React, { useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getColumnList } from '../selectors/app';
import { setColumn as setColumnRequest } from '../actions/app';
import Block from './Block';

function Filter(props) {
  const { column, setColumn } = props;

  const [tempCol, seTempCol] = useState(column);

  const handleShowChange = function(index){
    let newColumn = Array.from(tempCol);
    newColumn[index].show = !tempCol[index].show;

    seTempCol(newColumn);
  }

  const handleColumnOrderChange = function(dragIndex, hoverIndex){
    let newColumn = Array.from(tempCol);
    let dragData = newColumn[dragIndex];
    newColumn[dragIndex] = newColumn[hoverIndex];
    newColumn[hoverIndex] = dragData;

    seTempCol(newColumn);
  }

  return (
    <div className="filter__container">
      <div className="filter">
        <DndProvider backend={HTML5Backend}>
          <div className="filter__blocks">
            {
              tempCol.map((val, index) => 
                <Block 
                  {...val} 
                  index={index} 
                  key={val.value}
                  handleShowChange={handleShowChange}
                  handleColumnOrderChange={handleColumnOrderChange}
                />
              )
            }
          </div>
          <div className="filter__btn">
            <button className="btn btn-primary" onClick={() => setColumn(tempCol)}>Apply Changes</button>
          </div>
        </DndProvider>
      </div>
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  column: getColumnList()
});

const mapDispatchToProps = (dispatch) => ({
  setColumn: (data) => dispatch(setColumnRequest(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);