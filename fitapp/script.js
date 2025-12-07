const workouts = [
  {
    id: 1,
    name: "Treino Puxada",
    exercises: [
      { name: "Puxada alta aberta", duration: 30, instructions: "Foco na qualidade do movimento.", videoUrl: "https://www.youtube.com/embed/94seKBQlxLk" },
      { name: "Puxada alta fechada", duration: 30, instructions: "Foco na qualidade do movimento.", videoUrl: "https://www.youtube.com/embed/UZ8Tu7hiXdk" },
      { name: "Remada Aberta", duration: 30, instructions: "Foco na qualidade do movimento.", videoUrl: "https://www.youtube.com/embed/IVUC76X7iOI" },
      { name: "Remada Fechada", duration: 30, instructions: "Foco na qualidade do movimento.", videoUrl: "https://www.youtube.com/embed/vFKHJs3t3Dw" },
      { name: "Rosca alternada", duration: 30, instructions: "Foco na qualidade do movimento, mantenha cotovelo parado.", videoUrl: "https://www.youtube.com/embed/K0_GN-vSRZI" },
      { name: "Rosca Scott", duration: 30, instructions: "Foco na qualidade do movimento, mantenha cotovelo parado.", videoUrl: "https://www.youtube.com/embed/0FPOPvuXDp8" },
      { name: "Rosca 21", duration: 30, instructions: "De preferencia use a barra W.", videoUrl: "https://www.youtube.com/embed/w8jp_qbKCLI" },
    ]
  },
  {
    id: 2,
    name: "Treino Intermediário",
    exercises: [
      { name: "Flexão de braço", duration: 40, instructions: "Mantenha o corpo reto.", videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4" },
      { name: "Prancha", duration: 45, instructions: "Segure o abdômen firme.", videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw" },
    ]
  },
  {
    id: 3,
    name: "Treino Avançado Full Body",
    exercises: [
      { name: "Burpees", duration: 40, instructions: "Salte e agache rapidamente.", videoUrl: "https://www.youtube.com/embed/dZgVxmf6jkA" },
      { name: "Flexão com batida", duration: 30, instructions: "Toque as mãos ao subir.", videoUrl: "https://www.youtube.com/embed/ME7NCHLJQJQ" },
      { name: "Prancha com movimento", duration: 45, instructions: "Mova as pernas alternando.", videoUrl: "https://www.youtube.com/embed/q2ovI2z3zv0" },
    ]
  }
];

let currentWorkout = null;
let currentExerciseIndex = 0;
let timeRemaining = 0;
let timerInterval = null;
let isPaused = false;

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email && password) {
    showScreen("landing-screen");
  } else {
    alert("Por favor, preencha e-mail e senha!");
  }
}

function goToWorkouts() {
  const list = document.getElementById("workout-list");
  list.innerHTML = "";

  workouts.forEach(w => {
    const totalDuration = w.exercises.reduce((sum, ex) => sum + ex.duration, 0);
    const card = document.createElement("div");
    card.className = "workout-card";

    card.innerHTML = `
      <h3>${w.name}</h3>
      <p class="workout-info">⏱ ${Math.ceil(totalDuration / 60)} min • ${w.exercises.length} exercícios</p>
      <div class="start-btn">Iniciar treino</div>
    `;

    card.querySelector(".start-btn").onclick = () => startWorkout(w);
    list.appendChild(card);
  });

  showScreen("workout-list-screen");
}


function startWorkout(workout) {
  currentWorkout = workout;
  currentExerciseIndex = 0;
  loadExercise();
  showScreen("workout-screen");
}

function loadExercise() {
  const ex = currentWorkout.exercises[currentExerciseIndex];
  document.getElementById("workout-title").textContent = currentWorkout.name;
  document.getElementById("exercise-name").textContent = ex.name;
  document.getElementById("exercise-instructions").textContent = ex.instructions;
  document.getElementById("exercise-video").src = ex.videoUrl;
  document.getElementById("exercise-progress").textContent = 
    `Exercício ${currentExerciseIndex + 1} de ${currentWorkout.exercises.length}`;
  timeRemaining = ex.duration;
  updateTimer();
  startTimer();
}

function startTimer() {
  clearInterval(timerInterval);
  isPaused = false;
  timerInterval = setInterval(() => {
    if (!isPaused) {
      timeRemaining--;
      updateTimer();
      if (timeRemaining <= 0) {
        nextExercise();
      }
    }
  }, 1000);
}

function updateTimer() {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;
  document.getElementById("timer").textContent = `${mins}:${secs.toString().padStart(2, "0")}`;
}

function togglePause() {
  isPaused = !isPaused;
  document.getElementById("pause-btn").textContent = isPaused ? "▶ Retomar" : "⏸ Pausar";
}

function nextExercise() {
  if (currentExerciseIndex < currentWorkout.exercises.length - 1) {
    currentExerciseIndex++;
    loadExercise();
  } else {
    clearInterval(timerInterval);
    alert("Treino completo! 🎉");
    goBackToWorkouts();
  }
}

function goBackToWorkouts() {
  clearInterval(timerInterval);
  showScreen("workout-list-screen");
}

function goBackToLanding() {
  showScreen("landing-screen");
}

function goBackToLogin() {
  showScreen("login-screen");
}
