import { fromJS } from 'immutable';
import quizQuestions from '../api/quizQuestions';
import * as Constants from '../constants/constants';

// The initial state of the App
const initialState = fromJS({
  questions: [],
  fetching: false,
  fetched:false,
  error: {}
});

function QuizReducer(state = initialState, action) {
  //alert(action.type)
  switch (action.type) {
    case Constants.GET_ALL_QUESTION:
      return state
            .set('fetching', true)
            .set('fetched', false);
    case Constants.GET_ALL_QUESTION_SUCCESS:
    //Todo 
    return state
            .set('fetching', false)
            .set('fetched', true)
            .set('questions', quizQuestions/*action.data*/);
    case Constants.GET_ALL_QUESTION_FAILS:
      return state
            .set('fetching', false)
            .set('fetched', true)
            .set('questions', quizQuestions) 
            .set('error', action.error);
    case Constants.SUBMIT_ALL_ANSWER:
      return state
            .set('fetching', true)
            .set('fetched', false);
    case Constants.SUBMIT_ALL_ANSWER_SUCCESS:
      return state
            .set('fetching', false)
            .set('fetched', true);
    case Constants.SUBMIT_ALL_ANSWER_FAILS:
      return state
            .set('fetching', false)
            .set('fetched', true);
    default:
      return state;
  }
}

export default QuizReducer;
