const isKing = (row, pieceColor) => {
  if (pieceColor === 'r') {
    return row === '0';
  }
  if (pieceColor === 'b') {
    return row === '7';
  }
  return false;
};

const mutedeleteTypeGameData = currentData => {
  const newData = [].concat(currentData);
  newData.forEach(rowData => {
    rowData.map(item => {
      if (item.hasOwnProperty('type')) {
        item.type = null;
      }
    });
  });
  return newData;
};

const getPossibleMoves = (intRow, intCol, pieceColor, currentData) => {
  if (pieceColor === 'r') {
    const nextIntRow = intRow - 1;
    return getMoves(nextIntRow, intCol, pieceColor, currentData);
  }

  if (pieceColor === 'b') {
    const nextIntRow = intRow + 1;
    return getMoves(nextIntRow, intCol, pieceColor, currentData);
  }

  return [];
};

const getMoves = (nextIntRow, intCol, currentPieceColor, currentData) => {
  let moves = [];
  const nextIntLeftCol = intCol - 1;
  const nextIntRightCol = intCol + 1;
  if (isMoveAble(nextIntRow, nextIntLeftCol)) {
    const nextMove = setDirectMove(nextIntRow, nextIntLeftCol, currentPieceColor, currentData);
    if (nextMove) {
      moves.push(nextMove);
    }
  }
  if (isMoveAble(nextIntRow, nextIntRightCol)) {
    const nextMove = setDirectMove(nextIntRow, nextIntRightCol, currentPieceColor, currentData);
    if (nextMove) {
      moves.push(nextMove);
    }
  }

  return moves;
};

const setDirectMove = (nextIntRow, nextIntCol, currentPieceColor, currentData) => {
  const nextMoveCell = Object.assign({}, currentData[`${nextIntRow}`][`${nextIntCol}`]);
  const { pieceColor: nextPieceColor } = nextMoveCell;
  if (!nextPieceColor) {
    return { intRow: nextIntRow, intCol: nextIntCol, type: 'move' };
  }
  if (nextPieceColor !== currentPieceColor) {
    return { intRow: nextIntRow, intCol: nextIntCol, type: 'jumpable' };
  }
  return null;
};
const isMoveAble = (row, col) => {
  if (row <= -1 || row >= 8) {
    return false;
  }
  if (col <= -1 || col >= 8) {
    return false;
  }
  return true;
};

const getJumpableMoves = possibleMoves => {
  return possibleMoves.filter(i => i.type === 'jumpable');
};
const getDirectMoves = possibleMoves => {
  return possibleMoves.filter(i => i.type === 'move');
};

const getLeftjumpMoves = (jumpableMoves, intRow, intCol, currentPieceColor, currentData) => {
  if (currentPieceColor === 'r') {
    const nextIntJumpRow = intRow - 2;
    const nextIntLeftJumpCol = intCol - 2;
    const nextNearIntJumpRow = nextIntJumpRow - 1;
    const nextNearIntLeftJumpCol = nextIntLeftJumpCol - 1;
    return _getjumpMoves(
      currentData,
      jumpableMoves,
      nextIntJumpRow,
      nextIntLeftJumpCol,
      nextNearIntJumpRow,
      nextNearIntLeftJumpCol,
      currentPieceColor,
      getLeftjumpMoves,
    );
  }

  if (currentPieceColor === 'b') {
    const nextIntJumpRow = intRow + 2;
    const nextIntLeftJumpCol = intCol - 2;
    const nextNearIntJumpRow = nextIntJumpRow + 1;
    const nextNearIntLeftJumpCol = nextIntLeftJumpCol - 1;
    return _getjumpMoves(
      currentData,
      jumpableMoves,
      nextIntJumpRow,
      nextIntLeftJumpCol,
      nextNearIntJumpRow,
      nextNearIntLeftJumpCol,
      currentPieceColor,
      getLeftjumpMoves,
    );
  }
};
const getRightjumpMoves = (jumpableMoves, intRow, intCol, currentPieceColor,currentData) => {
  if (currentPieceColor === 'r') {
    const nextIntJumpRow = intRow - 2;
    const nextIntRightJumpCol = intCol + 2;
    const nextNearIntJumpRow = nextIntJumpRow - 1;
    const nextNearIntRightJumpCol = nextIntRightJumpCol + 1;
    const ret = _getjumpMoves(
      currentData,
      jumpableMoves,
      nextIntJumpRow,
      nextIntRightJumpCol,
      nextNearIntJumpRow,
      nextNearIntRightJumpCol,
      currentPieceColor,
      getRightjumpMoves,
    );
    console.log(ret);
    return ret;
  }

  if (currentPieceColor === 'b') {
    const nextIntJumpRow = intRow + 2;
    const nextIntLeftJumpCol = intCol + 2;
    const nextNearIntJumpRow = nextIntJumpRow + 1;
    const nextNearIntLeftJumpCol = nextIntLeftJumpCol + 1;
    return _getjumpMoves(
      currentData,
      jumpableMoves,
      nextIntJumpRow,
      nextIntLeftJumpCol,
      nextNearIntJumpRow,
      nextNearIntLeftJumpCol,
      currentPieceColor,
      getRightjumpMoves,
    );
  }
};
const _getjumpMoves = (
  currentData,
  jumpableMoves,
  nextIntJumpRow,
  nextIntJumpCol,
  nextNearIntJumpRow,
  nextNearIntJumpCol,
  currentPieceColor,
  jumpFunction,
) => {
  if (isMoveAble(nextIntJumpRow, nextIntJumpCol)) {
    const nextJumpCell = Object.assign({}, currentData[`${nextIntJumpRow}`][`${nextIntJumpCol}`]);
    const { pieceColor: nextJumpPieceColor } = nextJumpCell;

    if (!nextJumpPieceColor) {
      const currentJumpMoves = [{ intRow: nextIntJumpRow, intCol: nextIntJumpCol, type: 'jump' }];
      if (isMoveAble(nextNearIntJumpRow, nextNearIntJumpCol)) {
        const { pieceColor: nextNearPieceColor } = Object.assign(
          {},
          currentData[`${nextNearIntJumpRow}`][`${nextNearIntJumpCol}`],
        );
        if (nextNearPieceColor && nextNearPieceColor !== currentPieceColor) {
          const nextJump = jumpFunction(
            currentJumpMoves,
            nextIntJumpRow,
            nextIntJumpCol,
            currentPieceColor,
          );

          return currentJumpMoves.concat(nextJump);
        }
      }
      return currentJumpMoves;
    }
  }
  return [];
};

const muteGameData = (combinedMovesObj, currentData) => {
  const newData = [].concat(currentData);
  newData.forEach(rowData => {
    rowData.map(item => {
      const key = `${item.row}-${item.col}`;
      if (combinedMovesObj[`${key}`]) {
        item.type = combinedMovesObj[`${key}`].type;
      }
    });
  });
  return newData
};


export {
  isKing,
  mutedeleteTypeGameData,
  getPossibleMoves,
  getJumpableMoves,
  getDirectMoves,
  getLeftjumpMoves,
  getRightjumpMoves,
  _getjumpMoves,muteGameData
};
