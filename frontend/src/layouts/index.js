import styles from './index.css';
import {connect} from "dva";
import Spinner from "react-spinkit";
import React from 'react'
import PropTypes from 'prop-types';

function BasicLayout(props) {

  const {checker,gettingGameData} =props
  return (
    <div className={styles.normal}>
      { gettingGameData?<Spinner
        name='ball-beat'
        color='olive'
        style={{ textAlign: "center" }}
      />:<>
        <h1 className={styles.title}>{checker.isRedRound?'Click Red Piece':'Click Black Piece'}</h1>
        {props.children}
      </>}
    </div>
  );
}

BasicLayout.propTypes = {
  checker: PropTypes.object,
  gettingGameData: PropTypes.bool
};

export default connect(({checker,loading}) => ({
  checker: checker,
  gettingGameData: loading.effects['checker/setGameData'],
}))(BasicLayout)
