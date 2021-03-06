window.onload = function () {
    $(`#play-button`).on(`click`, triviaGame.hidePlayButton)
        .on(`click`, triviaGame.timer)
        .on(`click`, triviaGame.drawQuestion)
        .on(`click`, triviaGame.drawAnswers)
        .on(`click`, triviaGame.drawScore);
};

var questions = [
    `This witch was indicted on a total of 25 different counts, related mainly to his past work for Ukrainian politicians and his finances. Of his two trials, the first ended in a conviction on eight counts of financial crimes, and to avert the second, he struck a plea deal in September of 2018.`,
    `This witch pleaded guilty to 8 counts — tax and bank charges, related to his finances and taxi business, and campaign finance violations, related to hush money payments to women who alleged affairs with Donald Trump.`,
    `This gaggle of witches were charged with crimes related to the hacking and leaking of leading Democrats’ emails in 2016.`,
    `This witch was arrested in July 2017 and pleaded guilty last October to making false statements to the FBI.`,
    `This witch was a former Trump campaign aide and another witch's longtime junior business partner. In February 2018, he agreed to a plea deal, pleading guilty to just one false statements charge and one conspiracy charge.`,
    `This coven of witches and their financiers were indicted on conspiracy charges, with some also being accused of identity theft. The charges related to a propaganda effort designed to interfere with the 2016 campaign.`,
];

var answers = [
    [`Paul Manafort`, `Michael Cohen`, `Mike Pence`, `David Duke`],
    [`Chuck Grassley`, `Joe Arpaio`, `Harvey Weinstein`, `Michael Cohen`],
    [`The Band U2`,`12 Russian GRU officers`,`Matt Damon & Ben Affleck`,`The Mormon Tabernacle Boys' Choir`],
    [`George Papadopoulos`,`Fancy Bear`,`Don Jr.`,`Sarah Huckabee Sanders`],
    [`Roger Stone`,`Jared Kushner`,`Rick Gates`,`Mr. Rogers`],
    [`The Twelve Monkeys`,`Internet Research Agency`,`The MAGA Men`,`Anonymous`],
];

var answerKey = [
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
];

var answerDescription = [
    `This witch is <u>Paul Manafort</u>, Trump’s former campaign chair!`,
    `This witch is <u>Michael Cohen</u>, Trump’s former lawyer!`,
    'This coven of witches is a group of <u>12 GRU officers</u> working at the behest of the Kremlin.',
    `This witch is <u>George Papadopoulus</u>, former foreign policy advisor to Trump's 2016 campaign.`,
    `This witch is <u>Rick Gates</u>, old pal of Manafort who flipped on him in Federal Court.`,
    `This "Russian Troll Farm" goes by the official-sounding name the <u>Internet Research Agency</u>.`,
];

var answerImage = [
    `assets/images/paul-manifort.jpg`,
    `assets/images/michael-cohen.jpg`,
    `assets/images/demo-hack.jpg`,
    `assets/images/george-p.jpg`,
    `assets/images/ricky-g.jpeg`,
    `assets/images/IRA.jpg`,
];

var questionIndex = 0;

var correctCount = 0;

var intervalId;

var triviaGame = {

    time: 20,

    drawQuestion: function () {
        $(`#game-name`).attr(`class`,`hide`)
            .empty();
        $(`#logo`).attr(`class`,`hide`)
            .attr(`src`,``)
            .empty();
        $(`#play-button`).empty()
            .attr(`class`,`hide`);
        $(`#drop-box`).empty()
            .attr(`class`,`hide`);
        $(`#dialogue-box`).text(`Which witch is this?`)
            .attr(`class`,``);
        $(`#question-box`).html(questions[questionIndex])
                        .attr(`class`,``);
    },

    drawScore: function () {
        var es = "es";
        if (questionIndex === 1) {
            es = "";
        };
        $(`#score-board`).text(`You've identified ${correctCount} out of ${questionIndex} witch${es} so far.`)
                        .attr(`class`,``);
    },

    drawCorrectAnswer: function () {
        $(`#question-box`).empty()
            .attr(`class`, `hide`);
        var correctAnswer = $(`<div>`);
        var correctImage = $(`<img>`);
        correctAnswer.attr(`id`, `answer-description`)
            .html(answerDescription[questionIndex-1]);
        correctImage.attr('src',answerImage[questionIndex-1]);
        $(`#dialogue-box`).append(correctAnswer);
        $(`#drop-box`).append(correctImage)
            .attr(`class`,``);
    },

    drawAnswers: function () {
        for (i = 0; i < 4; i++) {
            var button = $(`<button>`);
            button.text(answers[questionIndex][i])
                .attr(`class`, `answer-button`)
                .attr(`value`, answerKey[questionIndex][i]);
            $(`#answer-box`).append(button)
                .attr(`class`,``);
        };

        $(`.answer-button`).on(`click`, triviaGame.evaluate)
    },

    timer: function () {
        $(`#timer`).text(`00:20`)
                    .attr(`class`,``);
        intervalId = setInterval(triviaGame.count, 1000);
    },

    count: function () {

        triviaGame.time = triviaGame.time - 1;

        if (triviaGame.time < 0 & questionIndex === questions.length - 1) {
            questionIndex++;
            clearInterval(intervalId);
            $(`#dialogue-box`).text(`Time's up!`);
            $(`.answer-button`).attr(`class`, `hide`);
            triviaGame.drawScore();
            triviaGame.drawCorrectAnswer();
            setTimeout(function () {
                triviaGame.endGame();
            },
                5000)
        }
        else if (triviaGame.time < 0) {
            questionIndex++;
            clearInterval(intervalId);
            $(`#dialogue-box`).text(`Time's up for this question!`);
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
                    5000)            }

            else if (this.value === `0`) {
                $(`#dialogue-box`).text(`Sorry wrong answer!`);
                $(`.answer-button`).attr(`class`, `hide`);
                triviaGame.drawCorrectAnswer();
                triviaGame.drawScore();
                clearInterval(intervalId);
                setTimeout(function () {
                    triviaGame.endGame();
                },
                    5000)            };

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
        triviaGame.time = 21;
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
        $(`#logo`).attr(`class`,``)
        .attr(`src`,`assets/images/Logo.png`);
        $(`#timer`).empty();
        $(`#drop-box`).empty()
            .attr(`class`,`hide`);
        $(`#score-board`).empty()
            .attr(`class`,`hide`)
        $(`#question-box`).empty()
            .attr(`class`,`hide`);
        $(`#answer-box`).empty();
        $(`#game-name`).text(`WITCH HUNT`)
            .attr(`class`,``)
        $(`#dialogue-box`).html(`
            <h2>Game Over</h2>
            <p>You identified ${correctCount} out of ${questions.length} witches.</p>  `
        );
        triviaGame.time = 20;
        correctCount = 0;
        questionIndex = 0;
        $(`#play-button`).text(`PLAY AGAIN`);
        $(`#play-button`).attr(`class`, ``);
        $(`#timer`).attr(`class`,`hide`);
        $(`#answer-box`).attr(`class`,`hide`);

    },
}





