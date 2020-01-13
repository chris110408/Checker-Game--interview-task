import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd'

const ItemTypes =  {
  PIECE: 'PIECE',
}

const Square = ({ RowIndex, ColIndex, pieceColor, type, children }) => {

  const [{ isOver, canDrop }, drop] = useDrop({
    accept:  ItemTypes.PIECE,
    drop: () => {console.log('drop')},
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  })



  const squareColor = (row, col, type) => {
    if (type) {
      if (type === 'active') {
        return '#ddca7e';
      }
    }
    if (row % 2 === 0) {
      return col % 2 ? '#ddd' : '#fff';
    }
    if (row % 2 === 1) {
      return col % 2 ? '#fff' : '#ddd';
    }
  };

  return (
    <div
      ref={drop}
      row={RowIndex}
      col={ColIndex}
      key={`${RowIndex}-${ColIndex}`}
      style={{
        width: '12.5%',
        height: '12.5%',
        backgroundColor: `${squareColor(RowIndex, ColIndex, type)}`,
      }}
    >
      {pieceColor
        ? React.cloneElement(children, {
            RowIndex: RowIndex,
            ColIndex: ColIndex,
            pieceColor: pieceColor,
          })
        : null}
    </div>
  );
};

Square.propTypes = {
  type: PropTypes.string,
  pieceColor: PropTypes.string,
  RowIndex: PropTypes.number,
  ColIndex: PropTypes.number,
  children: PropTypes.node,
};

export default Square;
