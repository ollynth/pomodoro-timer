console.log("Renderer is loaded");

// GET DOM ELEMENTS
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

// TIMER TYPE
const workButton = document.getElementById('workButton');
const shortBreakButton = document.getElementById('breakButton');
const longBreakButton = document.getElementById('longBreakButton');

// SETTING ELEMENTS
const workDuration = document.getElementById('workDuration');
const shortBreakDuration = document.getElementById('breakDuration');
const longBreakDuration = document.getElementById('longBreakDuration');
const saveSettingsButton = document.getElementById('saveSettings');

// TIME SETUP
let workTime = 25 * 60; // 25 minutes in seconds
let shortBreakTime = 5 * 60; // 5 minutes in seconds
let longBreakTime = 15 * 60; // 15 minutes in seconds
let currentTime = shortBreakTime; // default to work time
let currentType = 'work'; // default type

// Update the timer display
let timeInterval
let timeLeft = currentTime * 60 // convert to seconds

// NOTIFICATIONS
const alarmSound = new Audio('audio/mixkit-island-beat-250.mp3');
if (Notification.permission !== 'granted') {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    } else {
      console.log('Notification permission denied.');
    }
  });
}

// SAVE SETTINGS
saveSettingsButton.onclick = () => {
    // Get values from input fields
    const workInput = parseInt(workDuration.value) || 25; // default to 25 if invalid
    const shortBreakInput = parseInt(shortBreakDuration.value) || 5; 
    const longBreakInput = parseInt(longBreakDuration.value) || 15; 

    // Update the times
    workTime = workInput * 60; // convert to seconds
    shortBreakTime = shortBreakInput * 60; 
    longBreakTime = longBreakInput * 60; 

    resetTimer(); 
    updateTimerDisplay();
}

// DISPLAY INITIAL TIME
workButton.onclick = () => {
    resetTimer(); 
    currentTime = workTime;  
    updateTimerDisplay();
    currentType = 'work';
}

shortBreakButton.onclick = () => {
    resetTimer();
    currentTime = shortBreakTime;  
    updateTimerDisplay();
    currentType = 'shortBreak';
}

longBreakButton.onclick = () => {
    resetTimer(); 
    currentTime = longBreakTime;
    updateTimerDisplay();
    currentType = 'longBreak';
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft/60)
    // minutes = minutes < 10 ? '0' + minutes : minutes; // pad with zero if needed
    let seconds = timeLeft % 60
    seconds = seconds < 10 ? '0' + seconds : seconds; 
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function startTimer() {
    if (timeInterval) return; // prevent multiple intervals

    timeInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                timeInterval = null;

                alarmSound.play();
                setTimeout(() => {
                    alarmSound.pause(); // Pause the sound
                    alarmSound.currentTime = 0; // Reset the sound to the beginning
                }, 25000);

                new Notification('Pomodoro Timer', {
                    body: 'Time is up! Take a break.',
                    icon: '⭐'
                });

                timeLeft = currentTime
                updateTimerDisplay();
            }

            startButton.textContent = "Pause"; 
            return;
        }, 1000);
}


// Start, Pause and resume the timer
startButton.onclick = () => {
    // start and resuming the timer
    if (!timeInterval) {
        startTimer();
        
    }
    // pausing the timer
    else {
        clearInterval(timeInterval);
        timeInterval = null;
        startButton.textContent = "Resume"; 
        return;
    }

}

// Reset the timer
function resetTimer() {
    clearInterval(timeInterval);
    timeInterval = null;
    timeLeft = currentTime; // reset to initial time
    updateTimerDisplay();
    startButton.textContent = "Start"; 
}

resetButton.onclick = () => {
    resetTimer();
}