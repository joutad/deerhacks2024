let operators = ["+", "-",]
const startBtn = document.getElementById("start-btn");
const question = document.getElementById("question");
const controls = document.querySelector(".controls-container");
const result = document.getElementById("result");
const submitBtn = document.getElementById("submit-btn");
const errorMessage = document.getElementById("error-msg");
let answerValue;
let operatorQuestion;

//Random Value Gen

const randomValue = (min,max) => Math.floor(Math.random() * (max - min)) + min;

const questionGenerator = () => {
    //Two random values between 1 and 20 

    let [num1, num2] = [randomValue(1,10),
    randomValue(1,10)]; 
    //for getting random operator
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    if (randomOperator == "-" && num2>num1) {[num1,num2] = [num2,num1]}

    //for solve equation
    let solution = eval(`${num1}${randomOperator}${num2}`);
    console.log(num1,randomOperator,num2,solution);

    //Placing input at random position
    //1 for num1, 2 for num2 and 3 for operator
    let randomVar = randomValue(1,5);

    if (randomVar==1){
        answerValue==num1;
        question.innerHTML = `<input type="number"id="inpuitValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
    }
    else if (randomVar==2){
        answerValue==num2;
        question.innerHTML = `<input type="number"id="inpuitValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
    }
    else if (randomVar==3){
        answerValue==num1;
        question.innerHTML = `<input type="number"id="inpuitValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
    }
    else if (randomVar==4){
        answerValue==num2;
        question.innerHTML = `<input type="number"id="inpuitValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
    }
};

questionGenerator();

