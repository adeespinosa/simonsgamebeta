var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// //Mechanics
// 1 - Start the game by pressing any key.
// 2 - show the button in the sequence.
// 3 - user will click a button.
// 4 - check if button pressed is correct. if correct, go to 2. if not, game over.

$(document).keypress(function(){
  if(started === false){
    nextSequence();
    started = true;
  }
})

//to animate what user clicked
$(".btn").click(function(){
  var colorClicked = $(this).attr("id");
  userClickedPattern.push(colorClicked);
  playSound(colorClicked);
  animatePress(colorClicked);
  checkAnswer(userClickedPattern.length - 1);
});

//to generate next color to be clicked
function nextSequence(){
  level++;
  $("#level-title").text("Level " + level);
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  animateBlink(0, gamePattern);
}

//to play sound and blink
function playSound(color){
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){$("#" + currentColor).removeClass("pressed");}, 100);
}

function animateBlink(index, array){
  if(index >= array.length)
    return;

  $("#" + gamePattern[index]).fadeOut(150).fadeIn(150);
  playSound(gamePattern[index]);
  index ++;
  setTimeout(animateBlink.bind({}, index, array), 500);
}

//to check answer
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{
    console.log("failed");
    startOver();
  }
}

//to start over
function startOver(){
  var wrongAnswer = new Audio("sounds/wrong.mp3");
  wrongAnswer.play();

  $("body").addClass("game-over");
  setTimeout(function(){$("body").removeClass("game-over");}, 200);

  $("h1").text("Game Over. Press Any Key to Restart");

  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
