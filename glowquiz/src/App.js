import React, { Component } from 'react';
import update from 'react-addons-update';
//import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import Result from './components/Result';
import {connect} from 'react-redux';
import UserInfo from './components/UserInfo';
import './App.css';
import * as actions from './actions';



class App extends Component {

  constructor(props) {
    super(props);
    this.props.dispatch(actions.getQuestionList());

    this.state = {
      counter: 0,
      emailId: "",
      questionId: 1,
      question: '',
      answerOptions: [],
      answer: '',
      questions: (this.props.quiz && this.props.quiz.get("questions")) || [{}],
      answersCount: {
        Nintendo: 0,
        Microsoft: 0,
        Sony: 0
      },
      answersList: [],
      result: ''
    };

    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmitTest = this.handleSubmitTest.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.quiz.get("questions")){
      this.setState({"questions": nextProps.quiz.get("questions")});
      if(nextProps.quiz.get("questions")[0]){
      this.setState({
        question: nextProps.quiz.get("questions")[0].question,
        answerOptions: nextProps.quiz.get("questions")[0].answers
      });

      }
    }
    
  }
  componentWillMount() {
    // const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));
    // this.setState({
    //   question: quizQuestions[0].question,
    //   answerOptions: shuffledAnswerOptions[0]
    // });
  }

  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };
  validateEmail(email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
  }
  handleSubmitTest(event) {
      if(!this.validateEmail(this.state.emailId)){
        alert("Please Enter Valid MailID");
      } else {
          let emailID = this.state.emailId;
          let data = this.state.questions.map((q, index)=>{
            return {
              "question": q.question,
              "answer": this.state.answersList[index]
            }
          });
          let payload = {
            "email" : this.state.emailId,
            "data" : data
          }
          alert(JSON.stringify(payload));
            this.props.dispatch(actions.SubmitAnswer(payload));
      }
  }

  handleEmailChange(event) {
    this.setEmail(event.currentTarget.value);   
     setTimeout(() => console.log("Email Id" + this.state.emailId), 300);
  }

  handleAnswerSelected(event) {
    this.setUserAnswer(event.currentTarget.value);
    let ansList=this.state.answersList; 
    ansList.push(event.currentTarget.value);
    this.setState({"answersList" : ansList});
//alert("handleAnswerSelected")
     if (this.state.questionId < this.state.questions.length) {
         setTimeout(() => this.setNextQuestion(), 300);
     } else {
         setTimeout(() => this.setResults(this.getResults()), 300);
     }
  }

  setUserAnswer(answer) {
    const updatedAnswersCount = update(this.state.answersCount, {
      [answer]: {$apply: (currentValue) => currentValue ? currentValue + 1 : 1}
    });
   // alert("options selected : "+ answer)
    this.setState({
        answersCount: updatedAnswersCount,
        answer: answer
    });
  }
  setEmail(email) {
    this.setState({
        emailId: email
    });
  }

  setNextQuestion() {
    const counter = this.state.counter + 1;
    const questionId = this.state.questionId + 1;
//alert("setNextQuestion")
    this.setState({
        counter: counter,
        questionId: questionId,
        question:this.state.questions[counter].question,
        answerOptions: this.state.questions[counter].answers,
        answer: ''
    });
  }

  getResults() {
    const answersCount = this.state.answersCount;
    const answersCountKeys = Object.keys(answersCount);
    const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    const maxAnswerCount = Math.max.apply(null, answersCountValues);

    return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
  }

  setResults(result) {
    if (result.length === 1) {
      this.setState({ result: result[0] });
    } else {
      this.setState({ result: 'Undetermined' });
    }
  }

  renderQuiz() {
    const quizQuestions =  this.state.questions || [{}];
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }

  renderResult() {
    //alert(JSON.stringify(this.state.answersCount))
   // alert(JSON.stringify(this.state.answersList))
    return (
      <Result quizResult={this.state.result} questions={this.state.questions} answers={this.state.answersList}  />
    );
  }

  render() {
    //alert("Hhi" + JSON.stringify(this.props.quiz.get("questions")))
    return (
      <div className="App">
        <div className="App-header">
          <h2>React Quiz</h2>
          <UserInfo emailId={this.state.emailId} onEmailChanged={this.handleEmailChange} onSubmitAnswer={this.handleSubmitTest}/>
        </div>
        { this.props.quiz.get("fetching") ? "loading"  : ( this.state.result  ? this.renderResult() : this.renderQuiz())}
      </div>
    );
  }

}

//export default App;

function mapState(state) {
  return {
    quiz: state.reducer,
  };
}




export default connect(mapState)(App);