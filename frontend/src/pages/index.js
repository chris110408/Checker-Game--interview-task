import styles from './index.css';
import generateGameData from '../utils/generateGameData';
import { Card, Icon, Tooltip } from 'antd';


const CheckerGame = (props)=>{


  const reset =() =>{}
  const saveGame =() =>{}
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

    </Card>
  );
}


export default CheckerGame
