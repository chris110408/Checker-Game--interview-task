import styles from './index.css';
import { Card, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import GameBoard from './components/checkerBoard';
import generateGameData from '../utils/generateGameData';
import Piece from './components/piece';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import {
  isKing,
  mutedeleteTypeGameData,
  getPossibleMoves,
  getJumpableMoves,
  getDirectMoves,
  getLeftjumpMoves,
  getRightjumpMoves,
  muteGameData
} from "../utils/helper"
import React,{useState,useEffect} from 'react';

const Gamedata = generateGameData();
const CheckerGame = props => {
  const [isRedRound,setGameRound] = useState(true)
  const [currentData,setGameData] = useState([])
  const [activePiece, setActivePiece] = useState(null);


  useEffect(() => {
    setGameData([].concat(Gamedata.game))
  }, []);


  const reset = () => {};
  const saveGame = () => {};


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

  return (
    <Card
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
          <GameBoard gameData={currentData}>
            <Piece
              showPossibleMove={showPossibleMove}
            />
          </GameBoard>
        </div>
      </DndProvider>
    </Card>
  );
};

export default CheckerGame;
