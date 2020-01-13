import styles from './index.css';
import { Card, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import GameBoard from './components/checkerBoard';
import generateGameData from '../utils/generateGameData';
import Piece from './components/piece';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'dva';
import {
  isKing,
  mutedeleteTypeGameData,
  getPossibleMoves,
  getJumpableMoves,
  getDirectMoves,
  getLeftjumpMoves,
  getRightjumpMoves,
  muteGameData,
  getKillPiecesObject
} from "../utils/helper"
import React,{useState,useEffect} from 'react';



let saveData = { game: [], isRedRound: null, gameId: null };
const CheckerGame = ({ dispatch, checker, submittingGameData, gettingGameData}) => {
  const { isRedRound, currentData, gameId } = checker;
  saveData.isRedRound = isRedRound;
  saveData.game = currentData;
  saveData.gameId = gameId;
  const [activePiece, setActivePiece] = useState(null);
  useEffect(() => {
    dispatch({
      type: 'checker/getGameData',
    });
    setupBeforeUnloadListener(_uploadListener);

    return () => {
      window.removeEventListener('beforeunload', _uploadListener);
    };
  }, [_uploadListener, dispatch]);

  const ListenerClosure = data => {
    const uploadListener = event => {
      alert(1)
      saveGame(data);
      event.returnValue = `Are you sure you want to leave?`;
    };
    return uploadListener;
  };
  const _uploadListener = ListenerClosure(saveData);

  const setupBeforeUnloadListener = Listener => {
    window.addEventListener('beforeunload', Listener);
  };
  const reset = () => {
    const data = generateGameData();
    setGameRound(true);
    setGameData([].concat(data.game));
    saveData.game =data.game
    saveGame(data.game);
    dispatch({
      type: 'checker/getGameData',
    });
  };

  const setGameRound = _isRedRound => {
    dispatch({
      type: 'checker/setIsRedRound',
      payload: _isRedRound,
    });
  };
  const setGameData = _data => {
    dispatch({
      type: 'checker/setCurrentData',
      payload: _data,
    });
  };
  const saveGame = () => {
    dispatch({
      type: 'checker/setGameData',
      payload: {
        game: saveData.game,
        id: saveData.gameId,
        isRedRound: saveData.isRedRound,
      },
    });
  };

  const switchRound = () => {
    setGameRound(!isRedRound);
  };

  const showPossibleMove =(intRow, intCol, pieceColor)=>{
    const _isKing = isKing(intRow, pieceColor);
    if (_isKing) {
      return;
    }
    if (pieceColor === 'r' && !isRedRound) {
      return;
    }
    if (pieceColor === 'b' && isRedRound) {
      return;
    }
    const newGameData =  mutedeleteTypeGameData(currentData);
    setGameData([].concat(newGameData));
    const moves = [];
    const jumps = [];
    const possibleMoves = getPossibleMoves(intRow, intCol, pieceColor,currentData);
    const jumpableMoves = getJumpableMoves(possibleMoves);
    const jumpMoves = jumpableMoves.reduce((acc, jumpableMove) => {
      console.log(currentData)
      //>0 left move <0 right move
      if (intCol - jumpableMove.intCol > 0) {
        return acc.concat(getLeftjumpMoves([], intRow, intCol, pieceColor,currentData));
      } else {
        return acc.concat(getRightjumpMoves([], intRow, intCol, pieceColor,currentData));
      }
      return acc;
    }, []);
    const directMoves = getDirectMoves(possibleMoves);
    const TempActivePiece = {
      key: `${intRow}-${intCol}`,
      intRow: intRow,
      intCol: intCol,
      pieceColor: pieceColor,
      type: 'active',
    };
    setActivePiece(TempActivePiece);
    const combinedMoves = [].concat(jumpMoves, directMoves, TempActivePiece);

    const combinedMovesObj = combinedMoves.reduce((acc, item) => {
      acc[`${item.intRow}-${item.intCol}`] = item;
      return acc;
    }, {});
    const mutedData = muteGameData(combinedMovesObj, currentData);
    setGameData([].concat(mutedData));

  }

  const dropPiece = (type, RowIndex, ColIndex) => {
    //!
    let killedPiecesObject = {};
    const dropSquare = Object.assign({}, currentData[`${RowIndex}`][`${ColIndex}`]);

    if (type === 'jump') {
      killedPiecesObject = getKillPiecesObject(dropSquare,activePiece);
    }

    console.log(killedPiecesObject);
    _executeMoves(killedPiecesObject, RowIndex, ColIndex);
  };
  const _executeMoves = (killedPiecesObject, DropRowIndex, DropColIndex) => {
    const newGameData =  mutedeleteTypeGameData(currentData);

    newGameData.forEach(rowData => {
      rowData.map(item => {
        const key = `${item.row}-${item.col}`;

        if (killedPiecesObject[`${key}`] || key === activePiece.key) {
          item.pieceColor = null;
        }

        item.type = null;
      });
    });

    newGameData[DropRowIndex][DropColIndex].pieceColor = activePiece.pieceColor;

    setGameData([].concat(newGameData));

    switchRound();
  };


  return (
    <Card
      loading={gettingGameData || submittingGameData}
      actions={[
        <Tooltip key='reset' title={'Restart Game'}>
          <Icon type='reload' key='reset' onClick={reset} />
        </Tooltip>,
        <Tooltip key='save' title={'Save Game'}>
          <Icon type='save' key='save' onClick={saveGame} />
        </Tooltip>,
      ]}
    >
      <DndProvider backend={Backend}>
        <div className={styles.board}>
          <GameBoard dropPiece={dropPiece} gameData={currentData}>
            <Piece
              showPossibleMove={showPossibleMove}
              activePiece={activePiece}
              isRedRound={isRedRound}
            />
          </GameBoard>
        </div>
      </DndProvider>
    </Card>
  );
};

CheckerGame.propTypes = {
  checker: PropTypes.object,
  gettingGameData: PropTypes.bool,
  submittingGameData:PropTypes.bool,
  dispatch:PropTypes.func
};

export default connect(({ checker, loading }) => ({
  checker: checker,
  submittingGameData: loading.effects['checker/getGameData'],
  gettingGameData: loading.effects['checker/setGameData'],
}))(CheckerGame);
