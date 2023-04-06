
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

var buttonColors = ["red","blue","green","yellow"];

function nextSequence () {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + level);
    level++;
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(clickedColor) {
    var audio = new Audio("sounds/" + clickedColor + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if(!start) {
        nextSequence();
        start = true;
    }
})

function checkAnswer(currLevel) {

    if(gamePattern[currLevel] === userClickedPattern[currLevel]) {
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}