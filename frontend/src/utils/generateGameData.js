const generateGameData = () => {
  const setPieceColor = (RowIndex, ColIndex) => {
    if (RowIndex >= 5) {
      return (RowIndex + ColIndex) % 2 === 1 ? 'r' : null;
    }
    if (RowIndex <= 2) {
      return (RowIndex + ColIndex) % 2 === 1 ?  'b' : null;
    }
    return null;
  };

  const BoardRowHolder = [[],[],[],[],[],[],[],[] ];
  const BoardColHolder = [[],[],[],[],[],[],[],[] ];

  const data = BoardRowHolder.map((row, RowIndex) => {
    const newBoardColHolder = [].concat(BoardColHolder);
    return newBoardColHolder.map((_, ColIndex) => {
      return { row: RowIndex, col: ColIndex, pieceColor: setPieceColor(RowIndex, ColIndex),type:null };
    });
  });

  return {game:data,isRedRound:true,activePiece:null};
};

export default generateGameData
