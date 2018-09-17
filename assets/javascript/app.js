window.onload = function () {
    $(`#play-button`).on(`click`, triviaGame.hidePlayButton);
    $(`#play-button`).on(`click`, triviaGame.timer);
    $(`#play-button`).on(`click`, triviaGame.drawQuestion);
    $(`#play-button`).on(`click`, triviaGame.drawAnswers);
    $(`#play-button`).on(`click`, triviaGame.drawScore);
};

var questions = [
    `[This witch] was indicted on a total of 25 different counts [...], related mainly to his past work for Ukrainian politicians and his finances. He had two trials scheduled, and the first ended in a conviction on eight counts of financial crimes. To avert the second trial, [he] struck a plea deal [...] in September 2018.`,
    `[This witch] pleaded guilty to 8 counts — tax and bank charges, related to his finances and taxi business, and campaign finance violations, related to hush money payments to women who alleged affairs with Donald Trump.`,
];

var answers = [
    [`Paul Manifort`, `Michael Cohen`, `Mike Pence`, `David Duke`],
    [`Chuck Grassley`, `Joe Arpaio`, `Harvey Weinstein`, `Michael Cohen`],
];

var answerKey = [
    [1, 0, 0, 0],
    [0, 0, 0, 1],
];

var answerDescription = [
    `This witch is Paul Manafort, Trump’s former campaign chair!`,
    `This witch is Michael Cohen, Trump’s former lawyer !`,
]

var answerImage = [
    `assets/images/paul-manifort.jpg`,
    `assets/images/michael-cohen.jpg`,
]

var questionIndex = 0;

var correctCount = 0;

var intervalId;

var triviaGame = {

    time: 15,

    drawQuestion: function () {
        $(`#play-button`).empty()
            .attr(`class`,`hide`);
        $('#drop-box').attr(`class`,`hide`);
        $(`#dialogue-box`).text(`Which witch is this?`)
            .attr(`class`,``);
        $(`#drop-box`).empty();
        $(`#question-box`).html(questions[questionIndex])
                        .attr(`class`,``);
    },

    drawScore: function () {
        var es = "es";
        if (questionIndex === 1) {
            es = "";
        };
        $(`#score-board`).text(`You identified ${correctCount} out of ${questionIndex} witch${es}.`)
                        .attr(`class`,``);
    },

    drawCorrectAnswer: function () {
        var correctAnswer = $(`<div>`);
        var correctImage = $(`<img>`);
        correctAnswer.attr(`id`, `answer-description`)
                    .text(answerDescription[questionIndex-1]);
        correctImage.attr('src',answerImage[questionIndex-1]);
        $(`#dialogue-box`).append(correctAnswer);
        $(`#drop-box`).append(correctImage);
        $('#drop-box').attr(`class`,``);
    },

    drawAnswers: function () {
        for (i = 0; i < 4; i++) {
            var button = $(`<button>`);
            button.text(answers[questionIndex][i]);
            button.attr(`class`, `answer-button`);
            button.attr(`value`, answerKey[questionIndex][i]);
            $(`#answer-box`).append(button);
            $(`#answer-box`).attr(`class`,``);
        };

        $(`.answer-button`).on(`click`, triviaGame.evaluate);
    },

    timer: function () {
        $(`#timer`).text(`00:15`)
                    .attr(`class`,``);
        intervalId = setInterval(triviaGame.count, 1000);
    },

    count: function () {

        triviaGame.time = triviaGame.time - 1;

        if (triviaGame.time < 0 & questionIndex === questions.length - 1) {
            questionIndex++;
            clearInterval(intervalId);
            $(`#dialogue-box`).attr(`class`,'background');
            $(`#dialogue-box`).text(`Times up!`);
            $(`.answer-button`).attr(`class`, `hide`);
            triviaGame.drawScore();
            triviaGame.drawCorrectAnswer();
            setTimeout(function () {
                triviaGame.endGame();
            },
                3000)
        }
        else if (triviaGame.time < 0) {
            questionIndex++;
            clearInterval(intervalId);
            $(`#dialogue-box`).text(`Times up for this question!`);
            $(`.answer-button`).attr(`class`, `hide`);
            triviaGame.drawScore();
            triviaGame.drawCorrectAnswer();
            triviaGame.nextQuestion();
        }
        else if (triviaGame.time < 10) {
            $(`#timer`).text(`00:0${triviaGame.time}`);
        }
        else {
            $(`#timer`).text(`00:${triviaGame.time}`);
        }
    },

    evaluate: function () {

        questionIndex++;

        if (questionIndex === questions.length) {

            if (this.value === `1`) {
                $(`#dialogue-box`).text(`Great job!`);
                $(`.answer-button`).attr(`class`, `hide`)
                triviaGame.drawCorrectAnswer();
                correctCount++;
                triviaGame.drawScore();
                clearInterval(intervalId);
                setTimeout(function () {
                    triviaGame.endGame();
                },
                    3000)            }

            else if (this.value === `0`) {
                $(`#dialogue-box`).text(`Sorry wrong answer!`);
                $(`.answer-button`).attr(`class`, `hide`);
                triviaGame.drawCorrectAnswer();
                triviaGame.drawScore();
                clearInterval(intervalId);
                setTimeout(function () {
                    triviaGame.endGame();
                },
                    3000)            };

        } else {

            if (this.value === `1`) {

                $(`#dialogue-box`).text(`Great job!`);
                $(`.answer-button`).attr(`class`, `hide`)
                triviaGame.drawCorrectAnswer();
                correctCount++;
                triviaGame.drawScore();
                triviaGame.nextQuestion();
            } 
            
            else if (this.value === `0`) {
                $(`#dialogue-box`).text(`Sorry wrong answer!`);
                $(`.answer-button`).attr(`class`, `hide`);
                triviaGame.drawCorrectAnswer();
                triviaGame.drawScore();
                triviaGame.nextQuestion();
            };
        }
    },

    nextQuestion: function () {
        clearInterval(intervalId);
        triviaGame.time = 16;
        setTimeout(function () {
            $(`#question-box`).empty();
            $(`#answer-box`).empty();
            triviaGame.timer();
            triviaGame.drawQuestion();
            triviaGame.drawAnswers();
        },
            5000);
    },

    endGame: function () {
        $(`#timer`).empty();
        $(`#drop-box`).empty()
            .attr(`class`,`hide`);
        $(`#score-board`).empty();
        $(`#question-box`).empty()
            .attr(`class`,`hide`);
        $(`#answer-box`).empty();
        $(`#dialogue-box`).html(`
            <h2>Game Over</h2>
            <p>You identified ${correctCount} out of ${questions.length} witches.</p>  `
        );
        triviaGame.time = 15;
        correctCount = 0;
        questionIndex = 0;
        $(`#play-button`).text(`PLAY AGAIN`);
        $(`#play-button`).attr(`class`, ``);
        $(`#timer`).attr(`class`,`hide`);
        $(`#answer-box`).attr(`class`,`hide`);

    },
}





