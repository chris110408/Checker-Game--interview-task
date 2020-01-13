import request from '@/utils/request';

const backEndServer = 'http://192.168.31.66:7001'


async function createGameDataRequest(payload) {
  console.log(payload)
  return request(`${backEndServer}/game`, {
    method: 'POST',
    data: payload,
  });
}



async function updateGameDataRequest(payload) {
  console.log(payload)
  return request(`${backEndServer}/game/${payload.id}`,{
    method: 'patch',
    data: payload.newValue,
  });
}


async function getGameDataRequest(payload) {
  return request(`${backEndServer}/game`);
}

export {getGameDataRequest,updateGameDataRequest,createGameDataRequest}
