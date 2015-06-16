// Angular
var app = angular.module('multiplyApp', []);

app.controller('multiplyAppController', function ($scope) {

  // Languages control
  $scope.vocabulary = vocabulary;

  $scope.setLanguage = function(lang) {
    $scope.vocabulary.current = lang;    
  };

  // Navigation control
  $scope.tab = 1;
  
  $scope.selectTab = function (setTab) {
    $scope.tab = setTab;    
  };

  $scope.isSelected = function (checkTab) {
    return $scope.tab === checkTab;
  };

  // Help page implementation
  $scope.activeHelp = 1;

  $scope.showHelp = function (num) {
    $scope.activeHelp = num;
  }

  $scope.isActiveHelp = function (num) {
    return $scope.activeHelp === num;
  }

  // Game Options setting to default
  $scope.options = {
    "difficulty"        : "easy",
    "operations"        : {
      "Add"       : true,
      "Substract" : true,
      "Multiply"  : true,
      "Divide"    : true
    },
    "onlyMultiplyTable" : true,
    "maxValue"          : 100
  }; 

  // Game status
  $scope.game = {
    "started"    : false,
    "timerValue" : 60,
    "score"      : 0,
    "question"   : "? ? ?",
    "message"    : "If all options are set up, then you may start!",
    "wrong"      : ""
  };

  // Handle Start Button click
  $scope.startGame = function () {    
    
    if($scope.game.timer) clearTimeout($scope.game.timer);
    
    $scope.game.score = 0;
    $scope.game.wrong = "";    
    $scope.game.message = "The game started!";
    
    $scope.game.timer = setInterval(function() {      
      $scope.game.timerValue -= 1;
      if( $scope.game.timerValue <= 0)
      {
        $scope.game.message = "Defeat! Time is out! Your score is " + $scope.game.score;
        clearTimeout($scope.game.timer);        
      }
      $scope.$apply();
    },1000);
  };

  // Hanle Go button click, check user answer modify score, generate new question
  $scope.nextQuestion = function() {
    var answer = parseInt(document.getElementById('user_answer').value);
    //TODO ....
    /*if(correctAnswer == parseInt(answerLabel.value))
    {
      userMessage.style.color = "green";
      userMessage.innerHTML = "Correct!";
      score ++;
      timerValue += difficulty;
    } else {
      userMessage.style.color = "red";
      userMessage.innerHTML = "Wrong!";
      alert(questionLabel.innerHTML + " = " + correctAnswer.toString());
      questions.push(questions[random]);
      addWrong(questionLabel.innerHTML, correctAnswer.toString());
    }
    scoreLabel.innerHTML = score.toString();
    correctAnswer = randomQuestion();
    answerLabel.value = "";
    answerLabel.focus();*/
  };

});

// Adding an element to the "wrong-list"
var addWrong = function(question, answer) {
  var node = document.createElement('li');
  var textnode = document.createTextNode(question + " = " + answer);
  node.appendChild(textnode);
  wrongList.appendChild(node);
}
/*
// Cache some DOM-elements
var goButton;
var scoreLabel;
var timerLabel;
var diffRadio;
var modeRadio;
var questionLabel;
var answerLabel;
var userMessage;
var wrongList;

window.onload = function()
{
  // Init DOM-elements
  startButton = document.getElementById('start');
  goButton = document.getElementById('go');
  scoreLabel = document.getElementById('score');
  timerLabel = document.getElementById('timer_value');
  userMessage = document.getElementById('user_message');
  questionLabel = document.getElementById('question_output');
  answerLabel = document.getElementById('user_answer');
  diffRadio = document.getElementsByName('diff');
  modeRadio = document.getElementsByName('mode');
  wrongList = document.getElementById('wrongList');
  
  GenerateQuestions();  
};

function GenerateQuestions() 
{
  for(var t = 2; t < 10; t++)
  {
    for(var j = 2; j < 10; j++)
    {
      var obj = new Object();
      obj.x1 = t;
      obj.y1 = j;
      obj.res1 = t * j;
      obj.x2 = t * j;
      obj.y2 = t;
      obj.res2 = j;
      questions.push (obj);
    }
  }
} 

window.onkeyup = function(e) {
  if(e.keyCode == 13 && timerValue) userPressedGo(); 
};

// Generate random question
var randomQuestion = function() {
  var max = questions.length;
  random = Math.floor(Math.random() * max) - 1;  
  
  if(mode == 1) {
    questionLabel.innerHTML = questions[random].x1.toString() + " * " + questions[random].y1.toString();    
    return questions[random].res1;
  } else {
    if(Math.floor(Math.random() * 2) + 0) {
      questionLabel.innerHTML = questions[random].x1.toString() + " * " + questions[random].y1.toString();    
      return questions[random].res1;
    } else {
      questionLabel.innerHTML = questions[random].x2.toString() + " : " + questions[random].y2.toString(); 
      return questions[random].res2;
    }
  }  
};

*/
