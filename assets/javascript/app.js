window.onload = function () {
    $("#play-button").on("click", triviaGame.drawQuestion);
    $("#play-button").on("click", triviaGame.drawAnswers);
    $("#play-button").on("click", triviaGame.timer);
    $("#play-button").on("click", triviaGame.hidePlayButton);
};

var questions = [
    "Who is the dumbass president?",
    "How many seasons are there?",
];

var answers = [
    ["Trump", "Clinton", "FDR", "David Duke"],
    ["one", "two", "three", "four"],
];

var answerKey = [
    [true, false, false, false],
    [false, false, false, true],
];

var questionIndex = 0;

var intervalId;

var triviaGame = {



    time: 30,


    drawQuestion: function () {
        $("#question-box").text(questions[questionIndex]);
    },

    drawAnswers: function () {
        for (i = 0; i < 4; i++) {
            var button = $("<button>");
            button.text(answers[questionIndex][i]);
            button.attr("value", answerKey[questionIndex][i]);
            $("#answer-box").append(button)
        }
    },

    timer: function () {
        intervalId = setInterval(triviaGame.count, 500);
    },

    count: function () {
        triviaGame.time = triviaGame.time - 1;
        if (triviaGame.time < 1) {
            clearInterval(intervalId);
            $("#timer").text(`00:00`);
            questionIndex++;
            setTimeout(triviaGame.nextQuestion, 3000);
        }
        else if (triviaGame.time < 10) {
            $("#timer").text(`00:0${triviaGame.time}`);
        }
        else {
            $("#timer").text(`00:${triviaGame.time}`);
        }
    },

    nextQuestion: function() {
        triviaGame.time = 30;
        $("#question-box").empty();
        $("#answer-box").empty();
        triviaGame.drawQuestion();
        triviaGame.drawAnswers();
        triviaGame.timer();
    },

    hidePlayButton: function () {
        $("#play-button").attr("class", "hide");
    },
}


