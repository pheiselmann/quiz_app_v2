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
		answer3: "The Velvet Underground",
		answer4: "Flipper",
		correctAnswer: "The Velvet Underground"
		}
	]
};

var questionTemplate = (
	'<form class="quiz-form" class="js-quiz-form" id="js-quiz-form">' +
	    '<span class="js-answer-feedback"></span>' +
	    '<span class="js-question-count"></span><br>' +
	    '<span class="js-quiz-score"></span><br>' +
		'<span class="js-question"></span><br>' +
      	'<input class="radio" type="radio" name="js-answer1" required value="js-answer1" >' + 
      	'<span class="js-answer_1" id="answerId"></span><br>' +
      	'<input class="radio" type="radio" name="js-answer2" value="js-answer2" >' +
      	'<span class="js-answer_2" id="answerId"></span><br>' +
        '<input class="radio" type="radio" name="js-answer3" value="js-answer3" >' +
        '<span class="js-answer_3" id="answerId"></span><br>' +
        '<input class="radio" type="radio" name="js-answer4" value="js-answer4" >' +
        '<span class="js-answer_4" id="answerId"></span><br>' +
        '<button class="js-submit" type="submit" value="submit">Submit Answer</button><br>' +
    '</form>' 
    
);


function startQuiz(formElement, questionTemplate, state) {
  $('#js-start-quiz').click(function(event) {
    event.preventDefault();
	$(this).addClass("hidden");

    var questionIndex = state.questionCount.length - 1;
    var feedback = 0;
    renderQuestion(formElement, questionTemplate, questionIndex, state, feedback);
    
  });
}


function renderQuestion(formElement, questionTemplate, questionIndex, state, feedback) {

	var element = $(questionTemplate);

	element.find('.js-question-count').text("Question " + state.questionCount.length +
		" out of 5");
	element.find('.js-quiz-score').text("Score: " + state.correctAnswers.length + " Correct, " +
		state.incorrectAnswers.length + " Incorrect");
	element.find('.js-question').text(state.questions[questionIndex].question);
	element.find('.js-answer_1').text(state.questions[questionIndex].answer1);
	element.find('.js-answer_2').text(state.questions[questionIndex].answer2);
	element.find('.js-answer_3').text(state.questions[questionIndex].answer3);
	element.find('.js-answer_4').text(state.questions[questionIndex].answer4);

	var feedbackMsg = feedback;

	if (feedbackMsg === 0) {
		element.find('.js-answer-feedback').text("");
	}
	else if (feedbackMsg === 1) {
		element.find('.js-answer-feedback').text("Correct!");

	}
	else if (feedbackMsg === 2) {
		element.find('.js-answer-feedback').text("Incorrect!  The correct answer is \"" + 
			state.questions[questionIndex].correctAnswer + "\".");
	}

	formElement.html(element);

}

function renderFeedback(formElement, questionTemplate, questionIndex, state, feedback) {
	var element = $(questionTemplate);

	element.find('.radio').addClass("hidden");
	element.find('.js-submit').addClass('hidden');

	var feedbackMsg = feedback;

	if (feedbackMsg === 0) {
		element.find('.js-answer-feedback').text("");
	}
	else if (feedbackMsg === 1) {
		element.find('.js-answer-feedback').text("Correct!");

	}
	else if (feedbackMsg === 2) {
		element.find('.js-answer-feedback').text("Incorrect!  The correct answer is \"" + 
			state.questions[questionIndex].correctAnswer + "\".");
	}

	formElement.html(element);
 }

function renderFinalScore(formElement, questionTemplate, questionIndex, state, feedback) {
	var element = $(questionTemplate);

	element.find('.js-quiz-score').text("Score: " + state.correctAnswers.length + " Correct, " +
		state.incorrectAnswers.length + " Incorrect");
	element.find('.radio').addClass("hidden");
	element.find('.js-submit').addClass('hidden');

	var feedbackMsg = feedback;

	if (feedbackMsg === 0) {
		element.find('.js-answer-feedback').text("");
	}
	else if (feedbackMsg === 1) {
		element.find('.js-answer-feedback').text("Correct!");

	}
	else if (feedbackMsg === 2) {
		element.find('.js-answer-feedback').text("Incorrect!  The correct answer is \"" + 
			state.questions[questionIndex].correctAnswer + "\".");
	}

	formElement.html(element);
}


function handleSubmitAnswer(formElement, state) {
	formElement.on('click', '.js-submit', function(event) {
		event.preventDefault();
		var answer = formElement.find("input[type='radio']:checked").val();
        
        var answerNumber = "answer" + answer.slice(-1);
        var questionIndex = state.questionCount.length - 1;
        var feedback;

        if (state.questions[questionIndex][answerNumber] === state.questions[questionIndex].correctAnswer) {
        	feedback = 1;
        	incrementCorrectAnswers(state);
        	renderFeedback(formElement, questionTemplate, questionIndex, state, feedback);
        	
        } else {
        	feedback = 2;
        	incrementIncorrectAnswers(state);
        	renderFeedback(formElement, questionTemplate, questionIndex, state, feedback);
        }
       
        if (state.questionCount.length < 5) {
        	$('.js-next-question').removeClass("hidden");
        } else {
        	renderFinalScore(formElement, questionTemplate, questionIndex, state, feedback);
        	$('.js-play-again').removeClass('hidden');
        }
        
	});
	
}

function playAgain(formElement, questionTemplate, state) {
	$('#js-play-again').click(function(event) {
    event.preventDefault();
	$(this).addClass("hidden");

	state.questionCount = [1];
	state.correctAnswers = [];
	state.incorrectAnswers = [];

	var questionIndex = state.questionCount.length - 1;
	var feedback = 0;
    renderQuestion(formElement, questionTemplate, questionIndex, state, feedback);
    });
}

function nextQuestion(formElement, questionTemplate, state) {
	$('#js-next-question').click(function(event) {
    event.preventDefault();
	$(this).addClass("hidden");

    incrementQuestionCount(state);
    var questionIndex = state.questionCount.length - 1;
    var feedback = 0;
    renderQuestion(formElement, questionTemplate, questionIndex, state, feedback);
  });
}


function incrementQuestionCount(state) {
	state.questionCount.push(1);	
}

function incrementCorrectAnswers(state) {
	state.correctAnswers.push(1);
}

function incrementIncorrectAnswers(state) {
	state.incorrectAnswers.push(1);
}

function hideItem(itemClass) {

	$(itemClass).click(function(event) {
    event.preventDefault();
	$(this).addClass("hidden");
	});
}

$(function() {
	var formElement = $('.js-display-question');
	nextQuestion(formElement, questionTemplate, state);
	startQuiz(formElement, questionTemplate, state);
    handleSubmitAnswer(formElement, state);
});