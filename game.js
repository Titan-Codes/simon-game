var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// Checks if the game has started and also checks if you press any key to restart the game.

$(document).click(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Event which handles the button clicks and gets the ID of the button clicked.

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

// This functions checks your pattern and the randomly generated pattern and executes differently in both situations.

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

        startOver();
    }
}

// This function takes care of displaying level, choosing random colors and etc. stuff.

function nextSequence() {
    level++;
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#level-title").text(`Level ${level}`)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

// Function which plays sound and takes name of the sound as a parameter.

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function which adds 'pressed' class to the button after it's pressed.

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to reset all the stuff and start the game from starting.

function startOver() {
    var level = 0;
    gamePattern = [];
    var started = false;
}