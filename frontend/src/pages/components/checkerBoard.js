import React from 'react';
import Square from './square';
import PropTypes from 'prop-types';

const GameBoard = ({ gameData, dropPiece, children }) => {
  const RenderBoard = gameData => {
    return gameData.map((RowItems, RowIndex) => {
      return RowItems.map((ColItem, ColIndex) => {
        const { pieceColor, type } = ColItem;

        return (
          <Square
            dropPiece={dropPiece}
            RowIndex={RowIndex}
            ColIndex={ColIndex}
            pieceColor={pieceColor}
            key={`${RowIndex}-${ColIndex}`}
            type={type}
          >
            {children}
          </Square>
        );
      });
    });
  };

  return <>{RenderBoard(gameData, children)}</>;
};

GameBoard.propTypes = {
  gameData: PropTypes.array,
  children: PropTypes.node,
  dropPiece: PropTypes.func,
};

export default GameBoard;
