window.onload = function()
{
  //Init DOM-elements
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

  userMessage.innerHTML = "Pick difficulty, mode and press Start Button when ready. Good Luck!";
  startButton.onclick = function()
  { 
    if(timer) clearTimeout(timer);

    timerValue = 60;
    score = 0;
    wrongList.innerHTML = "";

    if(!Init()) return;    
    userMessage.style.color = "black";
    userMessage.innerHTML = "The game started!";
    timer = setInterval(function() {
      timerValue--;
      timerLabel.innerHTML = timerValue.toString();
      if(timerValue == 0)
      {
        userMessage.innerHTML = "Defeat! Time is out! Your score is " + score.toString();
        clearTimeout(timer);
      }
    },1000);
    answerLabel.value = "";
    answerLabel.focus();
  };  

  goButton.onclick = function()
  {
    if(timer) userPressedGo();        
  };
};

window.onkeyup = function(e) {
  if(e.keyCode == 13 && timerValue) userPressedGo(); 
};

// Cache some DOM-elements
var startButton;
var goButton;
var scoreLabel;
var timerLabel;
var diffRadio;
var modeRadio;
var questionLabel;
var answerLabel;
var userMessage;
var wrongList;

//some globals
var correctAnswer;
var timerValue;
var timer;
var score = 0;

// Options
var difficulty = 0; // seconds to add on correct answer ( easy || middle || hard )
var mode = 0; //Game Mode: 1 - multiply only, 2 - multiply + divide ( 1 || 2 )

//Initialize picked options
var Init = function() {
 
  for(var t = 0; t < diffRadio.length; t++)
    if(diffRadio[t].checked) {
      if(diffRadio[t].value == "easy") difficulty = 20;
      else if(diffRadio[t].value == "middle") difficulty = 15;
      else if(diffRadio[t].value == "hard") difficulty = 10;
      break;
    }
  if(!difficulty) {
    alert("Pick difficulty, please");
    return false;
  }

  for(var t = 0; t < modeRadio.length; t++)
    if(modeRadio[t].checked) {
      mode = parseInt(modeRadio[t].value);
    }
  if(!mode) {
    alert("Pick mode, please");
    return false;
  }
  
  if(difficulty && mode) {
    correctAnswer = randomQuestion();
  }   
  return true;
};

// Generate random question
var randomQuestion = function() {
  var firstNumber = Math.floor(Math.random() * 8) + 2; //8  = max - min + 1
  var secondNumber = Math.floor(Math.random() * 8) + 2; 
  var result = firstNumber * secondNumber;

  if(mode == 1) {
    questionLabel.innerHTML = firstNumber.toString() + " * " + secondNumber.toString();
    return result;
  } else {
    if(Math.floor(Math.random() * 2) + 0) {
      questionLabel.innerHTML = firstNumber.toString() + " * " + secondNumber.toString();
      return result;
    } else {
      questionLabel.innerHTML = result.toString() + " : " + firstNumber.toString(); 
      return secondNumber;
    }
  }  
};

//User pressed go handler
var userPressedGo = function() {
  if(correctAnswer == parseInt(answerLabel.value))
  {
    userMessage.style.color = "green";
    userMessage.innerHTML = "Correct!";
    score ++;
    timerValue += difficulty;
  } else {
    userMessage.style.color = "red";
    userMessage.innerHTML = "Wrong!";
    alert(questionLabel.innerHTML + " = " + correctAnswer.toString());
    addWrong(questionLabel.innerHTML, correctAnswer.toString());
  }
  scoreLabel.innerHTML = score.toString();
  correctAnswer = randomQuestion();
  answerLabel.value = "";
  answerLabel.focus();
};

//Adding an element to the "wrong-list"
var addWrong = function(question, answer) {
  var node = document.createElement('li');
  var textnode = document.createTextNode(question + " = " + answer);
  node.appendChild(textnode);
  wrongList.appendChild(node);
}

