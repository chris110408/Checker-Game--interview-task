import {
  getGameDataRequest,
  createGameDataRequest,
  updateGameDataRequest,
} from '@/services/checker';

import { notification } from 'antd';
import generateGameData from '../utils/generateGameData';

const openNotificationWithIcon = (type, title, msg) => {
  notification[type]({
    message: title,
    description: msg,
  });
};

const Model = {
  namespace: 'checker',

  state: {
    activePiece: null,
    gameId: null,
    isRedRound: true,
    currentData: [],
  },

  effects: {
    *getGameData({ payload }, { call, put }) {
      const response = yield call(getGameDataRequest, payload);
      const { error, msg } = response;

      if (error) {
        openNotificationWithIcon('error');
      }
      if (msg) {
        let _data = response.data[0];
        if (!_data) {
          _data = yield call(generateGameData);
        }
        yield put({
          type: 'setCurrentData',
          payload: _data.game,
        });
        yield put({
          type: 'setIsRedRound',
          payload: _data.isRedRound,
        });
        yield put({
          type: 'setGameId',
          payload: _data._id,
        });
      }
    },
    *setGameData({ payload }, { call, put }) {
      const { id } = payload;
      let response;
      if (id) {
        delete payload.id;
        response = yield call(updateGameDataRequest, { newValue: payload, id });
      } else {
        response = yield call(createGameDataRequest, payload);
      }
      const { error, msg } = response;
      if (error) {
        openNotificationWithIcon('error');
      }
      if (msg) {
        yield put({
          type: 'getGameData',
        });
      }
    },
  },

  reducers: {
    setIsRedRound(state, { payload }) {
      return {
        ...state,
        isRedRound: payload,
      };
    },
    setCurrentData(state, { payload }) {
      return {
        ...state,
        currentData: payload,
      };
    },
    setGameId(state, { payload }) {
      return {
        ...state,
        gameId: payload,
      };
    },
  },
};

export default Model;
