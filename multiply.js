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
var questions = [];
var random;

// Options
var difficulty = 0; // seconds to add on correct answer ( easy || middle || hard )
var mode = 0; //Game Mode: 1 - multiply only, 2 - multiply + divide ( 1 || 2 )

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
  
  GenerateQuestions();
  userMessage.innerHTML = "Pick difficulty, mode and press Start Button when ready. Good Luck!";

  startButton.onclick = function()
  { 
    if(timer) clearTimeout(timer);

    timerValue = 60;
    score = 0;
    wrongList.innerHTML = "";
    scoreLabel.innerHTML = "";

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

//Initialize picked options
var Init = function() {
 
  for(var t = 0; t < diffRadio.length; t++)
    if(diffRadio[t].checked) {
      if(diffRadio[t].value == "easy") difficulty = 15;
      else if(diffRadio[t].value == "middle") difficulty = 10;
      else if(diffRadio[t].value == "hard") difficulty = 5;
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
    questions.push(questions[random]);
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