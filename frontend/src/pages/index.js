import styles from './index.css';
import { Card, Icon, Tooltip } from 'antd';
import PropTypes from 'prop-types';
import GameBoard from './components/checkerBoard';
import generateGameData from '../utils/generateGameData';
import Piece from './components/piece';

const Gamedata = generateGameData();
const CheckerGame = props => {
  const { game: currentData } = Gamedata;

  const reset = () => {};
  const saveGame = () => {};

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
      <div className={styles.board}>
        <GameBoard gameData={currentData}>
          <Piece />
        </GameBoard>
      </div>
    </Card>
  );
};

export default CheckerGame;
