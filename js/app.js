// Angular
var app = angular.module('multiplyApp', []);

app.controller('multiplyAppController', function ($scope, $interval) {

  // Languages control
  $scope.vocabulary = vocabulary;

  $scope.setLanguage = function(lang) {
    $scope.vocabulary.current = lang;
    if($scope.game.started === false)
    {
      $scope.game.question = $scope.vocabulary.QuestionAtStart[ $scope.vocabulary.current ];
      $scope.game.message = $scope.vocabulary.GameMessageAtStart[ $scope.vocabulary.current ];
    }
  };

  // Navigation control
  $scope.tab = 1;
  
  $scope.selectTab = function (setTab) {
    $scope.tab = setTab;
    if(setTab != 2 && $scope.game.started)
    {
      $scope.game.timerValue = 0;
    }
  };

  $scope.isSelected = function (checkTab) {
    return $scope.tab === checkTab;
  };

  // Help page implementation
  $scope.activeHelp = 1;

  $scope.showHelp = function (num) {
    $scope.activeHelp = num;
  };

  $scope.isActiveHelp = function (num) {
    return $scope.activeHelp === num;
  };

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
    "started"    : false,  // Indicates game start    
    "timerValue" : 60,
    "score"      : 0,
    "question"   : $scope.vocabulary.QuestionAtStart[ $scope.vocabulary.current ],
    "increment"  : 0,
    "decrement"  : 0,
    "answer"     : "",
    "message"    : $scope.vocabulary.GameMessageAtStart[ $scope.vocabulary.current ],
    "wrong"      : "", // Dynamic list of wrong elements
    "actions"    : []
  };

  // Handle Start Button click
  $scope.startGame = function () {
    $scope.game.started = true;

    if($scope.game.timer != 'undefined')
      $interval.cancel($scope.game.timer);

    switch($scope.options.difficulty)
    {
      case "easy":
        $scope.game.increment = 15;
        $scope.game.decrement = 1;
        break;
      case "middle":
        $scope.game.increment = 10;
        $scope.game.decrement = 2;
        break;
      case "hard":
        $scope.game.increment = 5;
        $scope.game.decrement = 3;
        break;
      case "imba":
        $scope.game.increment = 5;
        $scope.game.decrement = 3;
        break;
    }
    
    $scope.game.score = 0;
    $scope.game.timerValue = 60;
    $scope.game.wrong = "";
    $scope.game.message = $scope.vocabulary.GameStartedMessage[ $scope.vocabulary.current ];

    document.getElementById("user_answer").value = "";
    document.getElementById("wrongList").innerHTML = "";

    $scope.game.timer = $interval ( function () {
      $scope.game.timerValue--;
      if($scope.game.timerValue <= 0 )
      {
        $scope.game.message = $scope.vocabulary.GameEndedMessage[ $scope.vocabulary.current ] + $scope.game.score;
        $interval.cancel($scope.game.timer);
        $scope.game.started = false;
      }
    }, 1000);
    generateQuestion();
  };

  // Hanle Go button click, check user answer modify score, generate new question
  $scope.nextQuestion = function() {
    checkAnswer();
    generateQuestion();
    document.getElementById("user_answer").value = "";
  };

  var checkAnswer = function()
  {
    var answer = parseInt( document.getElementById('user_answer').value, 10 );
    
    if(answer == $scope.game.answer)
    {
      $scope.game.timerValue += $scope.game.increment;
      $scope.game.message = $scope.vocabulary.Correct[ $scope.vocabulary.current ];
      $scope.game.score ++;
    }
    else
    {
      $scope.game.timerValue -= $scope.game.decrement;
      $scope.game.message = $scope.vocabulary.Wrong[ $scope.vocabulary.current ];
      addWrong();
    }

  };

  // Handle Enter press
  window.onkeyup = function(e) {
    if(e.keyCode == 13 && $scope.game.timerValue)
    {
      $scope.nextQuestion();
      $scope.$apply();
    }
  };

  // Generate random value, min - including, max- not including
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  // Adding an element to the "wrong-list"
  var addWrong = function() {
    var node = document.createElement('li');
    var textnode = document.createTextNode($scope.game.question + " = " + $scope.game.answer);
    node.appendChild(textnode);
    wrongList.appendChild(node);
  };

  // Serving main random logic
  var generateQuestion = function ()
  {
    var actions = [];
    if($scope.options.operations.Add) actions.push( generateAdd );
    if($scope.options.operations.Substract) actions.push( generateSubstract );
    if($scope.options.operations.Multiply) actions.push( generateMultiply );
    if($scope.options.operations.Divide) actions.push( generateDivide );
    

    var random = getRandomInt(0, actions.length);
    actions[random]();
  };


  function generateAdd()
  {
    var x = getRandomInt(1, $scope.options.maxValue);
    var y = getRandomInt(1, $scope.options.maxValue - x);
    $scope.game.question = x + " + " + y;
    $scope.game.answer = x+y;
  }

  function generateSubstract()
  {
    var x = getRandomInt(1, $scope.options.maxValue);
    var y = getRandomInt(1, x);
    $scope.game.question = x + " - " + y;
    $scope.game.answer = x-y;
  }

  function generateMultiply()
  {
    var x,y;
    if($scope.options.onlyMultiplyTable)
    {
      x = getRandomInt(2, 10);
      y = getRandomInt(2, 10);
    }
    else {
      x = getRandomInt(2, (Number)($scope.options.maxValue/2));
      y = getRandomInt(2, (Number)($scope.options.maxValue/5));
      
      while( (x * y) > $scope.options.maxValue)
        y = getRandomInt(2, 10);
      
    }
    $scope.game.question = x + " * " + y ;
    $scope.game.answer = x*y;
  }

  function generateDivide()
  {
    var x,y;
    if($scope.options.onlyMultiplyTable)
    {
      x = getRandomInt(2, 10);
      y = getRandomInt(2, 10);
    } else {
      x = getRandomInt(2, (Number)($scope.options.maxValue/2));
      y = getRandomInt(2, (Number)($scope.options.maxValue/5));
      
      while( (x * y) > $scope.options.maxValue)
        y = getRandomInt(2, 10);
    }

    var res = x * y;
    $scope.game.question = res + " : " + x;
    $scope.game.answer = y;
  }
});