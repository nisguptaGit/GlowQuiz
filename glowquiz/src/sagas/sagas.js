import { delay } from 'redux-saga';
import { take, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions';
import * as constants from '../constants/constants';
import axios from 'axios';
export function* callFetchALLQuestion(data) {
    //Todo : need valid API 
  const requestURL = "http://cricapi.com/api/matchCalendar?apikey=Rh6YPtg6QARWl5qUAd3r1cG07a12";
  try {

    const res = yield call(axios.get(requestURL)
      .then((response)=> put(actions.getQuestionListSuccess(response.data)))
      .catch((error)=> put(actions.getQuestionListFails(error)))
    );
    yield put(actions.getQuestionListSuccess(res));
  } catch(error) {
    yield put(actions.getQuestionListFails(error));
  }
}

export function* watchFetchALLQuestionRequest() {
  yield takeLatest(constants.GET_ALL_QUESTION, callFetchALLQuestion);
}

export function* callSubmitAnswers(data) {
  //Todo : need valid API 
  const requestURL = "http://cricapi.com/api/matchCalendar?apikey=Rh6YPtg6QARWl5qUAd3r1cG07a12";
  
  try {
    const res = yield call(axios.post(requestURL, data).then((response)=> put(actions.SubmitAnswerSuccess(response.data) )));
    // const res = requestURL;//yield call(request, requestURL);
    yield put(actions.SubmitAnswerSuccess(res));
  } catch(error) {
    //yield put(actions.SubmitAnswerFails(error));
  }
}


export function* watchSubmitAnswersRequest() {
  yield takeLatest(constants.SUBMIT_ALL_ANSWER, callSubmitAnswers);
}


export default [
  watchSubmitAnswersRequest,
  watchFetchALLQuestionRequest
];
