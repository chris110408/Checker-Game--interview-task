import moveImage from '../assets/move.png'
import React ,{useRef}from 'react';
const generatePieceColor=(pieceColor)=>{
  return pieceColor==='r'?'red':'black'
}

const setPieceShape=(row,pieceColor)=>{
  if(row==='0' && pieceColor ==='r'){
    return '0'
  }
  if(row==='7' && pieceColor ==='b'){
    return '0'
  }
  return '40px'
}





const Piece = ({row,col,pieceColor})  => {



  const StyleObj = {
    margin: 'auto auto',
    height: '38px',
    width: '38px',
    position: 'relative',
    top: '5px',
    borderRadius:setPieceShape(row,pieceColor),
    backgroundColor:  generatePieceColor(pieceColor),
    cursor: 'move',
  }




  return (
    <>
      <div onClick={()=>{}}
           style={{...StyleObj}}
      />
    </>
  );
};


export default Piece
