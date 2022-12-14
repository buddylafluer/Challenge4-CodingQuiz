var questionsArray = [
    {
        question: "Commonly used data types do NOT include:",
        answer: "alerts",
        options: [
            "strings",
            "booleans",
            "alerts",
            "numbers",
        ],
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        answer: "parenthesis",
        options: [
            "quotes",
            "curly brackets",
            "parentheses",
            "square brackets",
        ]
    },
    {
        question: "Arrays in JavaScript can be used to store _______.",
        answer: "all of the above",
        options: [
            "numbers and strings",
            "other arrays",
            "booleans",
            "all of the above"
        ]
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables",
        answer: "quotes",
        options: [
            "commas",
            "curly brackets",
            "quotes",
            "parenthesis"
        ]
    },
    {
        question: "A very useful tool used during development and debugginf for printing content to the debugger is:",
        answer: "console.log",
        options: [
            "JavaScript",
            "terminal/bash",
            "for loops",
            "console.log"
        ]
    }
];

var cardEl = document.querySelector("#card");
var startButtonEl = document.querySelector("#start-btn");
var optionsEl = document.createElement("ul");
var timeEl = document.querySelector("#currentTime");
var timer = 60;

function clear() {
    cardEl.innerHTML = "";
    optionsEl.innerHTML = "";
}

function renderQuestions(questionIndex) {
    if(questionIndex <=4) {

        clear();

        var questionEl = document.createElement("h1");
        questionEl.setAttribute("class", "title is-size-2");
        questionEl.textContent = questionsArray[questionIndex].question;
        cardEl.appendChild(questionEl);
    
        cardEl.appendChild(optionsEl);

        for(var i = 0; i < 4; i++) {
            var listOptionsEl = document.createElement("li");
            listOptionsEl.setAttribute("class","subtitle is-size-3");
            listOptionsEl.textContent = questionsArray[questionIndex].options[i];
            cardEl.appendChild(listOptionsEl);
            listOptionsEl.addEventListener("click", function(event) {
                var choice = event.target;
                if (choice.textContent === questionsArray[questionIndex].answer) {
                    renderQuestions(questionIndex + 1);
                }
                else {
                    timer = timer - 10;

                    renderQuestions(questionIndex + 1);
                }
            })
        }
    } else {
        finish();
    }
}

function timeStart () {
    setInterval(function() {
        timer--;

        timeEl.textContent = "Time:" + timer;
        if (timer <= 0) {
            endGame();
        }
    } ,1000)
}

function finish() {

    clear();

    var finishEl = document.createElement("h1");
    finishEl.setAttribute("class","title is-size-2");
    finishEl.textContent = "All Done!";
    cardEl.appendChild(finishEl);

    var finalScore = document.createElement("p");
    finalScore.setAttribute("class","subtitle is-size-3");
    cardEl.appendChild(finalScore);

    var score = timer;
    timeEl.remove();
    if(timer >= 0) {
        finalScore.textContent = "Your score is: " + score;
    }
    else {
        finalScore.textContent = "Out of time! Try again"
    }

    var writeInitials = document.createElement("input");
    writeInitials.setAttribute("class","input");
    writeInitials.setAttribute("id","userInput");
    writeInitials.setAttribute("type","text");
    writeInitials.setAttribute("name","initials")
    writeInitials.setAttribute("placeholder", "Insert initials to save Highscore");
    cardEl.appendChild(writeInitials);
    var submitButton = document.createElement("button");
    submitButton.setAttribute("class","button info");
    submitButton.setAttribute("onclick","save_data");
    submitButton.textContent = "Submit";
    cardEl.appendChild(submitButton);  
}

startButtonEl.addEventListener("click", function() {
    timeStart();
    
    renderQuestions(0);
})

