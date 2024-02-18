document.addEventListener("DOMContentLoaded", function () {
  const operators = ["+", "-"];
  const startButton = document.getElementById("startButton");
  const questionContainer = document.getElementById("questionContainer");
  const controlsContainer = document.querySelector(".controlsContainer");
  const resultMessage = document.getElementById("resultMessage");
  const submitButton = document.getElementById("submitButton");
  const errorMessage = document.getElementById("errorMessage");
  let answerValue;
  let operatorQuestion;
  let correctCount = 0;
  let incorrectCount = 0; // Initialize incorrect count

  // Random Value Generator
  const randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  const questionGenerator = () => {
    // Two random values between 1 and 10
    let [num1, num2] = [randomValue(1, 10), randomValue(1, 10)];

    // For getting - or +
    let randomOperator = operators[Math.floor(Math.random() * operators.length)];

    if (randomOperator == "-" && num2 > num1) {
      [num1, num2] = [num2, num1];
    }

    // Solve the equation
    let solution = eval(`${num1}${randomOperator}${num2}`);

    // For placing the input at random position
  
    let randomVar = randomValue(1, 5);

    if (randomVar == 1) {
      answerValue = num1;
      questionContainer.innerHTML = `<input type="number" id="inputValue" placeholder="?"\> ${randomOperator} ${num2} = ${solution}`;
    } else if (randomVar == 2) {
      answerValue = num2;
      questionContainer.innerHTML = `${num1} ${randomOperator}<input type="number" id="inputValue" placeholder="?"\> = ${solution}`;
    } else if (randomVar == 3) {
      answerValue = randomOperator;
      operatorQuestion = true;
      questionContainer.innerHTML = `${num1} <input type="text" id="inputValue" placeholder="?"\> ${num2} = ${solution}`;
    } else {
      answerValue = solution;
      questionContainer.innerHTML = `${num1} ${randomOperator} ${num2} = <input type="number" id="inputValue" placeholder="?"\>`;
    }

    // Input Check
    submitButton.addEventListener("click", () => {
      errorMessage.classList.add("hide");
      let userInput = document.getElementById("inputValue").value;

      // User input is not empty
      if (userInput) {
        // User guessed correct answer
        if (userInput == answerValue) {
          correctCount++; // Increment correct count
          stopGame(`<span>Correct</span> Answer!`);
        }
        // User inputs operator other than +,-
        else if (operatorQuestion && !operators.includes(userInput)) {
          errorMessage.classList.remove("hide");
          errorMessage.innerHTML = "Please enter + or -";
        }
        // If user guessed wrong answer
        else {
          incorrectCount++; // Increment incorrect count
          stopGame(`Try Again!`);
        }
      }
      // If user input is empty
      else {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = "Put an Answer!";
      }
    });
  };

  // Start Game
  startButton.addEventListener("click", () => {
    operatorQuestion = false;
    answerValue = "";
    correctCount = 0;
    incorrectCount = 0; // Reset incorrect count
    errorMessage.innerHTML = "";
    errorMessage.classList.add("hide");

    // Controls and buttons visibility
    controlsContainer.classList.add("hide");
    startButton.classList.add("hide");
    questionGenerator();
  });

  // Stop the Game
  const stopGame = (resultText) => {
    resultMessage.innerHTML = resultText;
    resultMessage.innerHTML += ` ${correctCount} correct answers.`;
    startButton.innerText = "Next Question";
    controlsContainer.classList.remove("hide");
    startButton.classList.remove("hide");
  };
});
