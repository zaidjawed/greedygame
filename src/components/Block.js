import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DND_ITEM_TYPE = 'Block';

export default function Block(props) {
  const {label, index, show, handleShowChange, handleColumnOrderChange} = props;

  const dropRef = useRef(null);
  const dragRef = useRef(null);

  const [{ isOver }, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    hover(item, monitor) {
      if (!dropRef.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      handleColumnOrderChange(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: DND_ITEM_TYPE,
    item: () => ({index}),
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  preview(drop(dropRef));
  drag(dragRef);

  return (
    <div className="block__container" ref={dropRef} style={{opacity: isDragging ? 0 : 1}}>
      <div className="block" onClick={() => handleShowChange(index)} ref={dragRef}>
        <p 
          className="block__item" 
          style={{
            background: show ? "#28a745" : "#fff", 
            color: show ? "#fff" : "inherit"
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}