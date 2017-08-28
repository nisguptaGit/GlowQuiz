import * as constants from '../constants/constants';

export function getQuestionList() {
  return {
    type: constants.GET_ALL_QUESTION
  };
}

export function getQuestionListSuccess(res) {
 // alert(JSON.stringify(res))
  return {
    type: constants.GET_ALL_QUESTION_SUCCESS,
    data: res
    };
}

export function getQuestionListFails(error) {
  //  alert(JSON.stringify(error))

  return {
    type: constants.GET_ALL_QUESTION_FAILS,
    error: error
    };
}

export function SubmitAnswer(data) {
  return {
    type: constants.SUBMIT_ALL_ANSWER,
    data: data
  };
}

export function SubmitAnswerSuccess(res) {
  return {
    type: constants.SUBMIT_ALL_ANSWER_SUCCESS,
    data: res
  };
}

export function SubmitAnswerFails(error) {
  return {
    type: constants.SUBMIT_ALL_ANSWER_FAILS,
    error: error
  };
}
