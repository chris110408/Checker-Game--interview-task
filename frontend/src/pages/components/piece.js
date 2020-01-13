import React,{useRef} from 'react';
import PropTypes from 'prop-types';
import { useDrag ,DragPreviewImage} from 'react-dnd'
import moveImage from '../../assets/move.png'

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
  const [{ isDragging }, drag,preview] = useDrag({
    item: { type: ItemTypes.PIECE },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: ()=>{
      return true
    },
  })


  const opacity = isDragging ? 0.5 : 1
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
      <DragPreviewImage connect={preview} src={moveImage}/>
      <div ref={ref} onClick={() => {}} style={{ ...StyleObj ,opacity}} />
    </>
  );
};

Piece.propTypes = {
  RowIndex: PropTypes.number,
  ColIndex: PropTypes.number,
  pieceColor: PropTypes.string,
};
export default Piece;
