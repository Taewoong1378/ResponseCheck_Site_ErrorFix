import { fork, put, takeLatest, call, all } from 'redux-saga/effects';
import axios from 'axios';

import {
    ADD_NICKNAME_REQUEST,
    ADD_NICKNAME_SUCCESS,
    ADD_NICKNAME_FAILURE,
    LOAD_NICKNAMES_REQUEST,
    LOAD_NICKNAMES_SUCCESS,
    LOAD_NICKNAMES_FAILURE,
    // RESET_REQUEST,
    // RESET_SUCCESS,
    // RESET_FAILURE,
} from '../reducers/user';

function addNicknameAPI(data) {
    return axios.post('/user', data);
}
// data: nickname & score

function* addNickname(action) {
    try {
      const result = yield call(addNicknameAPI, action.data);
      yield put({
        type: ADD_NICKNAME_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: ADD_NICKNAME_FAILURE,
        error: err.response.data,
      });
    }
}

function loadNicknamesAPI(data) {
  return axios.get('/users', data);
}

function* loadNicknames(action) {
  try {
    const result = yield call(loadNicknamesAPI, action.data);
    yield put({
      type: LOAD_NICKNAMES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_NICKNAMES_FAILURE,
      error: err.response.data,
    });
  }
}

// function* reset(action) {
//     try {
//       yield delay(0);
//       yield put({
//         type: RESET_SUCCESS,
//         data: action.data,
//       });
//     } catch (err) {
//       console.error(err);
//       yield put({
//         type: RESET_FAILURE,
//         error: err.response.data,
//       });
//     }
// }

function* watchAddNickname() {
    yield takeLatest(ADD_NICKNAME_REQUEST, addNickname);
}
function* watchLoadNicknames() {
    yield takeLatest(LOAD_NICKNAMES_REQUEST, loadNicknames);
}
// function* watchReset() {
//     yield takeLatest(RESET_REQUEST, reset);
// }

export default function* userSaga() {
    yield all([
      fork(watchAddNickname),
      fork(watchLoadNicknames),
      // fork(watchReset),
    ]);
}
  