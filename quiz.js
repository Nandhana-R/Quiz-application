
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const quesContainerElement = document.getElementById("question-container");
const quesElement = document.getElementById("question");
const ansContainerElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;
let score=0;

startButton.addEventListener("click",startGame);

nextButton.addEventListener("click",() => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame(){
    startButton.classList.add("hide");
    shuffledQuestions=questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex=0;
    quesContainerElement.classList.remove("hide");
    setNextQuestion();
    score=0;
}

function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    quesElement.innerText=question.question;
    question.answers.forEach((answer) =>{
        const button = document.createElement("button");
        button.innerText=answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        ansContainerElement.appendChild(button);
    });
}

function resetState(){
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while(ansContainerElement.firstChild){
        ansContainerElement.removeChild(ansContainerElement.firstChild);
    }
}

function selectAnswer(e){
    const SelectedButton = e.target;
    const correct = SelectedButton.dataset.correct;
    setStatusClass(document.body,correct);
    Array.from(ansContainerElement.children).forEach((button)=>{
        setStatusClass(button, button.dataset.correct);
    });
    if(shuffledQuestions.length > currentQuestionIndex+1){
        nextButton.classList.remove("hide");
    }else{
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
    }
    if(SelectedButton.dataset === correct){
        score++;
    }
    document.getElementById("right-answers").innerHTML=score;
}

function setStatusClass(element,correct){
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }else{
        element.classList.add("wrong");
    }
}

function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [
    {
        question: "which of these is a javascript framework?",
        answers :[
            {text:"Python", correct : false},
            {text:"Django", correct : false},
            {text:"React", correct : true},
            {text:"Eclipse", correct : false}
        ]
    },
    {
        question: "who is the current prime minister of India?",
        answers :[
            {text:"Narendra Modi", correct : true},
            {text:"Rahul Gandhi", correct : false}
        ]
    },
    {
        question: "Which is the capital Tamil Nadu?",
        answers :[
            {text:"Coimbatore", correct : false},
            {text:"Chennai", correct : true},
            {text: "Kanyakumari", correct : false}
        ]
    },
    {
        question: "What is 6*2+3?",
        answers :[
            {text:"30", correct : false},
            {text:"15", correct : true}
        ]
    }
]