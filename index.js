const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
    case (performance == 0):
    message = "Você é uma vergonha!"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Quantas luas tem marte?",
    answers: [
      { text: "3 luas", correct: false },
      { text: "7 luas", correct: false },
      { text: "2 luas", correct: true },
      { text: "5 luas", correct: false }
    ]
  },
  {
    question: "Qual é o maior planeta do sistema solar?",
    answers: [
      { text: "Júpter", correct: true },
      { text: "saturno", correct: false },
      { text: "Urano", correct: false },
      { text: "Netuno", correct: false }
    ]
  },
  {
    question: 'Qual planeta foi considerado planeta anão em 2006?',
    answers: [
      { text: 'Plutão', correct: true },
      { text: 'Saturno', correct: false },
      { text: 'Vênus', correct: false },
      { text: "Mércurio", correct: false }
    ]
  },
  {
    question: 'Marte é conhecido como planeta vermelho?',
    answers: [
      { text: "Verdadeiro", correct: true },
      { text: "Falso", correct: false }
    ]
  },
  {
    question: 'Qual é o menor planeta do sistema solar?',
    answers: [
      { text: 'Marte', correct: false },
      { text: 'Mercúrio', correct: true },
      { text: 'Terra', correct: false },
      { text: 'Netuno', correct: false }
    ]
  },
  {
    question: 'O que o sol é?',
    answers: [
      { text: 'Planeta', correct: false },
      { text: 'Estrela', correct: true },
      { text: 'Satelete natural', correct: false },
      { text: 'Cometa', correct: false }
    ]
  },
  {
    question: 'Qual é o único planeta abtavel"?',
    answers: [
      { text: 'Urano', correct: false },
      { text: 'Saturno', correct: false },
      { text: 'marte', correct: false },
      { text: 'Planeta Terra', correct: true },
    ]
  },
]