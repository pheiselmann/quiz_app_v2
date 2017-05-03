// $(function() {
// $("#js-quiz-form").submit(function(event) {
//   event.preventDefault();
//   var answer = $("form input[type='radio']:checked").val();
//   //$(this).children("span .message").text("woohoo!");
//   alert("Value of Submitted Radio is: " + answer);
//   })
// });

var state = {
	questionCount:[1],
    correctAnswers:[],
    incorrectAnswers: [],
	questions: [
		{
		question: "Which of these Americans did not win a Nobel Prize in Literature?" , 
		answer1: "Bob Dylan",
		answer2: "John Steinbeck",
		answer3: "Barack Obama",
		answer4: "Sinclair Lewis",
		correctAnswer: "Barack Obama"
		},
		{
		question: "Which of these Americans did not set a World Record in a track and field event?", 
		answer1: "Bruce Jenner",
		answer2: "Florence Griffith Joyner",
		answer3: "Jesse Owens",
		answer4: "Steve Prefontaine",		
	    correctAnswer: "Steve Prefontaine"
		},
		{
		question: "Which of these Americans won the first Olympic Decathlon?", 
		answer1: "Jim Thorpe",
		answer2: "Ashton Eaton",
		answer3: "Bruce Jenner",
		answer4: "John Belushi",
		correctAnswer: "Jim Thorpe"
		},
		{
		question: "Which of these American inventors was dubbed \"The Wizard of Menlo Park\"?", 
		answer1: "Henry Ford",
		answer2: "Thomas Edison",
		answer3: "Nikola Tesla",
		answer4: "George Washington Carver",
		correctAnswer: "Thomas Edison"
		},
		{
		question: "Which of these American musical groups was founded by Lou Reed?", 
		answer1: "The Beach Boys",
		answer2: "The Eagles",
		answer3: "The Velvet Undergound",
		answer4: "Flipper",
		correctAnswer: "The Velvet Underground"
		}
	]
};

var questionTemplate = (
	'<form class="js-quiz-form" id="js-quiz-form">' +
	    '<span class="js-question-count"></span><br>' +
		'<span class="js-question"></span><br>' +
      	'<input type="radio" name="js-answer1" required value="js-answer1" >' + 
      	'<span class="js-answer_1"></span><br>' +
      	'<input type="radio" name="js-answer2" value="js-answer2" >' +
      	'<span class="js-answer_2"></span><br>' +
        '<input type="radio" name="js-answer3" value="js-answer3" >' +
        '<span class="js-answer_3"></span><br>' +
        '<input type="radio" name="js-answer4" value="js-answer4" >' +
        '<span class="js-answer_4"></span><br>' +
        '<button class="js-submit" type="submit" value="submit">Submit Answer</button>' +
    '</form>'
);

var questionCountTemplate = (
    '<span class="js-question-counter"></span>'
);


var correctAnswers = 0;

var incorrectAnswers = 0;
	
var questionIndex = 0;



function displayCurrentScore(correctAnswers, incorrectAnswers) {


}

function startQuiz(formElement, questionCountElement, questionCountTemplate, questionTemplate, state) {
  $('#js-start-quiz').click(function(event) {
    event.preventDefault();
	$(this).addClass("hidden");
    //$('.js-test').text(state.questions[0].correctAnswer);
    var questionIndex = 0;
    renderQuestion(formElement, questionTemplate, questionIndex, state);
    //renderQuestionCount(questionCountElement, questionCountTemplate, state);
    
  });
}

// function renderQuestionCount(questionCountElement, questionCountTemplate, state) {
//    var element = $(questionCountTemplate);
   
//    element.find('js.question-counter').text("Question " + 
//                 state.questionCount.length + " out of 5");
   
//    questionCountElement.html(element);
//  }

function renderQuestion(formElement, questionTemplate, questionIndex, state) {

	var element = $(questionTemplate);

	element.find('.js-question-count').text("Question " + state.questionCount.length +
		" out of 5");
	element.find('.js-question').text(state.questions[questionIndex].question);
	element.find('.js-answer_1').text(state.questions[questionIndex].answer1);
	element.find('.js-answer_2').text(state.questions[questionIndex].answer2);
	element.find('.js-answer_3').text(state.questions[questionIndex].answer3);
	element.find('.js-answer_4').text(state.questions[questionIndex].answer4);

	formElement.html(element);
    //$('.js-display-question').html(element);
	//render question, update score, and update question count

}


function handleSubmitAnswer(formElement, state) {
	formElement.on('click', '.js-submit', function(event) {
		event.preventDefault();
		var answer = formElement.find("input[type='radio']:checked").val();
        //compare answer (which is 'value') to answer in state and then to correctAnswer
        var answerNumber = answer.slice(-1);
         
        //$('js-test').text(answer);
		alert("Value of Submitted Radio is: " + answer);
		// check answer, give feedback, render next item/score/question#
		//displayNextQuestionButton(); // show "Next Question" button
	});
	//renderQuestion

}

function incrementStateCounter(state) {
	state.questionCount.push(1);	
}

function hideItem(itemClass) {

	$(itemClass).click(function(event) {
    event.preventDefault();
	$(this).addClass("hidden");
	});
}

$(function() {
	var questionCountElement = $('.js-question-count');
	var formElement = $('.js-display-question');
	startQuiz(formElement, questionCountElement, questionCountTemplate, questionTemplate, state);
    handleSubmitAnswer(formElement, state);
});