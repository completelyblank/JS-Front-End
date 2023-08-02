// Get the elements from the DOM
const breakLengthElement = document.getElementById('break-length');
const sessionLengthElement = document.getElementById('session-length');
const timerLabelElement = document.getElementById('timer-label');
const timerLeftElement = document.getElementById('time-left');
const breakIncrementButton = document.getElementById('break-increment');
const sessionIncrementButton = document.getElementById('session-increment');
const breakDecrementButton = document.getElementById('break-decrement');
const sessionDecrementButton = document.getElementById('session-decrement');
const resetButton = document.getElementById('reset');
const startStopButton = document.getElementById('start_stop'); // New button element

// Set initial values for break and session lengths (in minutes)
let breakLength = 5;
let sessionLength = 25;
let isTimerRunning = false; // Variable to track the timer status (running or paused)
let intervalId; // Variable to store the timer interval ID

// Function to update the displayed break and session lengths
function updateDisplay() {
  breakLengthElement.textContent = breakLength;
  sessionLengthElement.textContent = sessionLength;
  updateTimerLeft(sessionLength, 0);
}

// Function to update the displayed time in mm:ss format
function formatTime(minutes, seconds) {
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to update the displayed time left
function updateTimerLeft(minutes, seconds) {
  const formattedTime = formatTime(minutes, seconds);
  timerLeftElement.textContent = formattedTime;
}

// Function to handle increment and decrement buttons for session and break lengths
function handleLengthChange(type, operation) {
  if (type === 'break') {
    if (operation === 'increment') {
      breakLength = Math.min(60, breakLength + 1);
    } else if (operation === 'decrement') {
      breakLength = Math.max(1, breakLength - 1);
    }
  } else if (type === 'session') {
    if (operation === 'increment') {
      sessionLength = Math.min(60, sessionLength + 1);
    } else if (operation === 'decrement') {
      sessionLength = Math.max(1, sessionLength - 1);
    }
  }

  if (!isTimerRunning) {
    updateDisplay(); // Update display only when the timer is not running
  }
}

// Event listeners for increment and decrement buttons for session and break lengths
breakIncrementButton.addEventListener('click', () => handleLengthChange('break', 'increment'));
sessionIncrementButton.addEventListener('click', () => handleLengthChange('session', 'increment'));
breakDecrementButton.addEventListener('click', () => handleLengthChange('break', 'decrement'));
sessionDecrementButton.addEventListener('click', () => handleLengthChange('session', 'decrement'));

// Function to start or stop the timer based on its current status
function startStopTimer() {
  if (isTimerRunning) {
    // Stop the timer if running
    clearInterval(intervalId);
  } else {
    // Start the timer if not running
    startTimer();
  }

  // Toggle the timer status
  isTimerRunning = !isTimerRunning;
}

// Event listener for the "start_stop" button
startStopButton.addEventListener('click', startStopTimer);

// Function to start the timer
function startTimer() {
  let initialMinutes = sessionLength; // Use 'let' to declare as a variable
  let seconds = 0;

  intervalId = setInterval(() => {
    if (seconds === 0) {
      if (initialMinutes === 0) {
        // Handle switching between break and session modes here
        // Reset initialMinutes to the break length when switching to break mode
      } else {
        initialMinutes--;
        seconds = 59;
      }
    } else {
      seconds--;
    }

    updateTimerLeft(initialMinutes, seconds);
  }, 1000);
}

// Function to reset the timer and length values
function resetTimer() {
  clearInterval(intervalId);
  breakLength = 5;
  sessionLength = 25;
  isTimerRunning = false; // Reset timer status
  updateDisplay();
}

// Event listener for the "reset" button
resetButton.addEventListener('click', resetTimer);

// Initialize the display
updateDisplay();
