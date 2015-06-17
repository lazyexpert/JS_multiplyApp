// Angular
var app = angular.module('multiplyApp', []);

app.controller('multiplyAppController', function ($scope, $interval) {

  // Languages control
  $scope.vocabulary = vocabulary;

  $scope.setLanguage = function(lang) {
    $scope.vocabulary.current = lang;
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
    "paused"     : false,  // Indicates game pause, used when wrong answer given
    "timerValue" : 60,
    "score"      : 0,
    "question"   : "Ready",
    "increment"  : 0,
    "decrement"  : 0,
    "answer"     : "",
    "message"    : "If all options are set up, then you may start!",
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
    $scope.game.message = "The game started!";

    document.getElementById("user_answer").value = "";
    document.getElementById("wrongList").innerHTML = "";

    $scope.game.timer = $interval ( function () {
      $scope.game.timerValue--;
      if($scope.game.timerValue <= 0 )
      {
        $scope.game.message = "Defeat! Time is out! Your score is " + $scope.game.score;
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
      $scope.game.message = "Correct!";
      $scope.game.score ++;
    }
    else
    {
      $scope.game.timerValue -= $scope.game.decrement;
      $scope.game.message = "Wrong!";
      addWrong();
    }

  };

  // Handle Enter press
  window.onkeyup = function(e) {
    if(e.keyCode == 13 && $scope.game.timerValue) $scope.nextQuestion();
  };

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
    if($scope.options.operations.Add) actions.push(0);
    if($scope.options.operations.Substract) actions.push(1);
    if($scope.options.operations.Multiply) actions.push(2);
    if($scope.options.operations.Divide) actions.push(3);
    

    var random = Math.floor(Math.random() * (actions.length));
    switch(random)
    {
      case 0:
        generateAdd();
        break;
      case 1:
        generateSubstract();
        break;
      case 2:
        generateMultiply();
        break;
      case 3:
        generateDivide();
        break;
      default:
        return;
    }

  };

  function generateAdd()
  {
    var x = Math.floor( Math.random() * $scope.options.maxValue) + 1;
    var y = Math.floor( Math.random() * ($scope.options.maxValue - x)) + 1;
    $scope.game.question = x + " + " + y;
    $scope.game.answer = x+y;
  }

  function generateSubstract()
  {
    var x = Math.floor( Math.random() * $scope.options.maxValue) + 1;
    var y = Math.floor( Math.random() * (x))+ 1;
    $scope.game.question = x + " - " + y;
    $scope.game.answer = x-y;
  }

  function generateMultiply()
  {
    if($scope.options.onlyMultiplyTable)
    {
      var x = Math.floor(Math.random() * 7) + 2;
      var y = Math.floor(Math.random() * 7) + 2;
      $scope.game.question = x + " * " + y ;
      $scope.game.answer = x*y;
    }
  }

  function generateDivide()
  {
    if($scope.options.onlyMultiplyTable)
    {
      var x = Math.floor(Math.random() * 7) + 2;
      var y = Math.floor(Math.random() * 7) + 2;
      var res = x * y;
      $scope.game.question = res + " : " + x;
      $scope.game.answer = y;
    }
  }

});

