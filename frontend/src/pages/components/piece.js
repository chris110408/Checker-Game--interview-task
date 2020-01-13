import React,{useRef} from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd'


const generatePieceColor = pieceColor => {
  return pieceColor === 'r' ? 'red' : 'black';
};

const setPieceShape = (row, pieceColor) => {
  if (row === '0' && pieceColor === 'r') {
    return '0';
  }
  if (row === '7' && pieceColor === 'b') {
    return '0';
  }
  return '40px';
};

const ItemTypes =  {
  PIECE: 'PIECE',
}


const Piece = ({ RowIndex, ColIndex, pieceColor }) => {

  const ref = useRef(null)
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PIECE },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: ()=>{
      return true
    },
  })



  const StyleObj = {
    margin: 'auto auto',
    height: '38px',
    width: '38px',
    position: 'relative',
    top: '5px',
    borderRadius: setPieceShape(RowIndex, pieceColor),
    backgroundColor: generatePieceColor(pieceColor),
    cursor: 'move',
  };

  drag(ref)
  return (
    <>
      <div ref={ref} onClick={() => {}} style={{ ...StyleObj }} />
    </>
  );
};

Piece.propTypes = {
  RowIndex: PropTypes.number,
  ColIndex: PropTypes.number,
  pieceColor: PropTypes.string,
};
export default Piece;
