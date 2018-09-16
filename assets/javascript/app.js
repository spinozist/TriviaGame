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
    [1, 0, 0, 0],
    [0, 0, 0, 1],
];

var questionIndex = 0;

var intervalId;

var triviaGame = {

    time: 15,

    drawQuestion: function () {
        $("#question-box").text(questions[questionIndex]);
    },

    drawAnswers: function () {
        for (i = 0; i < 4; i++) {
            var button = $("<button>");
            button.text(answers[questionIndex][i]);
            button.attr("class", "answer-button");
            button.attr("value", answerKey[questionIndex][i]);
            $("#answer-box").append(button)
        };

        $(".answer-button").on("click", triviaGame.evaluate);
    },

    timer: function () {
        intervalId = setInterval(triviaGame.count, 1000);
    },

    count: function () {

        triviaGame.time = triviaGame.time - 1;
        if (triviaGame.time < 0) {
            triviaGame.nextQuestion();
        }
        else if (triviaGame.time < 10) {
            $("#timer").text(`00:0${triviaGame.time}`);
        }
        else {
            $("#timer").text(`00:${triviaGame.time}`);
        }
    },

    evaluate: function () {

        if (this.value === "1") {
            $("#dialogue-box").text(`Great job!`);
            $(".answer-button").attr("class","hide")
            triviaGame.nextQuestion();
        }
        if (this.value === "0") {
            $("#dialogue-box").text(`Sorry wrong answer!`);
            triviaGame.nextQuestion();
        }
    },

    nextQuestion: function () {
        clearInterval(intervalId);
        questionIndex++;
        triviaGame.time = 15;
        setTimeout(function () {
            $("#question-box").empty();
            $("#answer-box").empty();
            triviaGame.drawQuestion();
            triviaGame.drawAnswers();
            triviaGame.timer();
        },
            3000);

    },

    hidePlayButton: function () {
        $("#play-button").attr("class", "hide");
    },
}




