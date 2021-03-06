var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var highScore=0;
var score=0;

var level = 0;
var started=false;
$(document).keydown(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// $("h1").click(function(){
//   if (!started) {
//     $("#level-title").text("Level " + level);
//     nextSequence();
//     started = true;
//   }
// });
$(".documentation").fadeOut();
$(".rulebtn").click(function(){
  $(".documentation").fadeToggle();
});
$(".clk").click(function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    setTimeout(function(){
      nextSequence();
    },800);
    started = true;
      $(".clk").fadeToggle();
  }
});

$(".btnn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $("."+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
  }
  else{
    if(score>highScore){
      highScore=score;
    }
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    $(".score ").text("Score of Last Round : "+score);
    $(".high-score").text("High Score : "+highScore);
    $("h1").html("Game Over. Press any key to restart <p>Or</p>");

    startOver();
  }

  if(userClickedPattern.length===gamePattern.length){
    score++;
    setTimeout(function(){
      nextSequence();
    },800);
  }
}
function startOver(){
  level=0;
  score=0;
  gamePattern=[];
  started=false;
  $(".clk").fadeIn();
}
