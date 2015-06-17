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
    "question"   : "? ? ?",
    "answer"     : "",
    "message"    : "If all options are set up, then you may start!",
    "wrong"      : "" // Dynamic list of wrong elements
  };

  // Handle Start Button click
  $scope.startGame = function () {
    
    if($scope.game.timer) $interval.cancel($scope.game.timer);
    
    $scope.game.score = 0;
    $scope.game.wrong = "";
    $scope.game.message = "The game started!";
        
    $scope.game.timer = $interval ( function () {
      $scope.game.timerValue--;
      if($scope.game.timerValue <= 0 )
      {
        $scope.game.message = "Defeat! Time is out! Your score is " + $scope.game.score;
        $interval.cancel($scope.game.timer);
      }
    }, 1000);
    generateQuestion();
  };

  // Hanle Go button click, check user answer modify score, generate new question
  $scope.nextQuestion = function() {
    var answer = parseInt( document.getElementById('user_answer').value, 10 );
        
  };

  // Handle Enter press
  window.onkeyup = function(e) {
    if(e.keyCode == 13 && $scope.game.timerValue) $scope.nextQuestion();
  };

  // Adding an element to the "wrong-list"
  var addWrong = function(question, answer) {
    /*var node = document.createElement('li');
    var textnode = document.createTextNode(question + " = " + answer);
    node.appendChild(textnode);
    wrongList.appendChild(node);*/
  };

  var generateQuestion = function ()
  {
    //Pick possible actions
    var actions = [];
    if($scope.options.operations.Add) actions.push(0);
    if($scope.options.operations.Substract) actions.push(1);
    if($scope.options.operations.Multiply) actions.push(2);
    if($scope.options.operations.Divide) actions.push(3);

    var random = Math.floor(Math.random() * (actions.length-0)) + 0;
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
    var x = Math.floor( Math.random() * $scope.options.maxValue);
    var y = Math.floor( Math.random() * ($scope.options.maxValue - x));
    $scope.game.question = x + " + " + y + "?";
    $scope.game.answer = x+y;
    
  }

  function generateSubstract()
  {

  }

  function generateMultiply()
  {

  }

  function generateDivide()
  {

  }

});

