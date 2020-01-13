import React from 'react';
import Square from './square';
import PropTypes from 'prop-types';

const GameBoard = ({ gameData, children }) => {
  console.log(gameData);
  const RenderBoard = gameData => {
    return gameData.map((RowItems, RowIndex) => {
      return RowItems.map((ColItem, ColIndex) => {
        const { pieceColor, type } = ColItem;

        return (
          <Square
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

      return null;
    });
  };

  return <>{RenderBoard(gameData, children)}</>;
};

GameBoard.propTypes = {
  gameData: PropTypes.array,
  children: PropTypes.node,
};

export default GameBoard;
