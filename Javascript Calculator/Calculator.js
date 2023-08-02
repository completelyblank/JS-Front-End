// Get references to the HTML elements
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const numberButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const decimalButton = document.getElementById("decimal");

let currentInput = "";
let previousInput = "";
let currentOperator = null;
let isOperatorClicked = false;
let isDecimalAdded = false;

// Function to update the display with the current input
const updateDisplay = () => {
  display.innerText = currentInput || "0";
};

// Function to handle number button clicks
const handleNumberClick = (event) => {
  const numValue = event.target.innerText;
  if (isOperatorClicked) {
    previousInput = currentInput;
    currentInput = numValue;
    isOperatorClicked = false;
  } else {
    currentInput = currentInput === "0" ? numValue : currentInput + numValue;
  }
  isDecimalAdded = false;
  updateDisplay();
};

// Function to handle operator button clicks
const handleOperatorClick = (event) => {
  const operatorValue = event.target.innerText;
  if (currentOperator && currentInput) {
    // If there was a previous operator, calculate the result
    calculateResult();
  }

  // Special handling for negative sign
  if (operatorValue === '-' && currentInput === "") {
    currentInput = "-";
    updateDisplay();
    return;
  }

  currentOperator = operatorValue;
  isOperatorClicked = true;
  isDecimalAdded = false;
};

// Function to handle decimal button click
const handleDecimalClick = () => {
  if (!isDecimalAdded && !currentInput.includes(".")) {
    currentInput += ".";
    isDecimalAdded = true;
    updateDisplay();
  }
};

// Function to handle clear button click
const handleClearClick = () => {
  currentInput = "";
  previousInput = "";
  currentOperator = null;
  isOperatorClicked = false;
  isDecimalAdded = false;
  updateDisplay();
};

// Function to calculate the result
const calculateResult = () => {
  let num1 = parseFloat(previousInput) || 0;
  let num2 = parseFloat(currentInput);

  // Handle negative numbers for multiplication and division
  if (currentOperator === "*" || currentOperator === "/") {
    if (num1 < 0 && num2 < 0) {
      // Both numbers are negative, convert them to positive and then multiply/divide
      num1 = Math.abs(num1);
      num2 = Math.abs(num2);
    } else if (num1 < 0 || num2 < 0) {
      // One number is negative, convert both to positive and then multiply/divide
      num1 = Math.abs(num1);
      num2 = Math.abs(num2);
    }
  }

  switch (currentOperator) {
    case "+":
      currentInput = (num1 + num2).toString();
      break;
    case "-":
      currentInput = (num1 - num2).toString();
      break;
    case "*":
      currentInput = (num1 * num2).toString();
      break;
    case "/":
      if (num2 !== 0) {
        currentInput = (num1 / num2).toString();
      } else {
        currentInput = "Error: Division by zero";
      }
      break;
    default:
      break;
  }

  currentOperator = null;
  isOperatorClicked = false;
  isDecimalAdded = false;
  updateDisplay();
};


// Add event listeners to number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", handleNumberClick);
});

// Add event listeners to operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", handleOperatorClick);
});

// Add event listener to decimal button
decimalButton.addEventListener("click", handleDecimalClick);

// Add event listener to clear button
clearButton.addEventListener("click", handleClearClick);

// Add event listener to equals button
equalsButton.addEventListener("click", () => {
  if (currentOperator && currentInput) {
    calculateResult();
  }
});
