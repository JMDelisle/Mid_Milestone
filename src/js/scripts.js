// navbar shrinkage
function updatemenu() {
  if (document.getElementById('responsive-menu').checked == true) {
    document.getElementById('menu').style.borderBottomRightRadius = '0';
    document.getElementById('menu').style.borderBottomLeftRadius = '0';
  } else {
    document.getElementById('menu').style.borderRadius = '10px';
  }
}

//========================================================

// below is for quiz page
(function(){
  // Functions
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
          </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join(" ");
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    if(currentSlide === 0){
      previousButton.style.display = "none";
    }
    else{
      previousButton.style.display = "inline-block";
    }
    if(currentSlide === slides.length-1){
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    }
    else{
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  // Variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "What should the internal cooking temperature for chicken?",
      answers: {
        a: "265℉",
        b: "165℉",
        c: "65℉"
      },
      correctAnswer: "b"
    },
    {
      question: "When is national BBQ month?",
      answers: {
        a: "July ",
        b: "May ",
        c: "Feburary"
      },
      correctAnswer: "b"
    },
    {
      question: "What is the most popular wood usded in smoking meats?",
      answers: {
        a: "Hickory",
        b: "Mesquite",
        c: "Oak",
        d: "2x4"
      },
      correctAnswer: "c"
    },
    {
      question: "The meat is typically served with a strong what?",
      answers: {
        a: "Horseradish",
        b: "Hp Sauce",
        c: "Ketchup",
        d: "Mustard"
      },
      correctAnswer: "a"
    },  
    {
      question: "What causes the red/pink ring that appear in meat after it's been smoked?",
      answers: {
        a: "The ring shows that the meat is not yet fully cooked",
        b: "A chemical reaction invlving nitrogen dioxide",
        c: "Wood particles from charcoal that discolor the meat",
      },
      correctAnswer: "b"
    }  

  ];

  // Kick things off
  buildQuiz();

  // Pagination
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
// Credit goes to: https://www.sitepoint.com/simple-javascript-quiz/
//============================================
let secondsRemaining;
let intervalHandle;

function resetPage(){

	document.getElementById("inputArea_timer").style.display = "block";

}

function tick(){
	// grab the h1
	let timeDisplay = document.getElementById("time");

	// turn the seconds into mm:ss
	let min = Math.floor(secondsRemaining / 60);
	let sec = secondsRemaining - (min * 60);

	//add a leading zero (as a string value) if seconds less than 10
	if (sec < 10) {
		sec = "0" + sec;
	}

	// concatenate with colon
	let message = min.toString() + ":" + sec;

	// now change the display
	timeDisplay.innerHTML = message;

	// stop is down to zero
	if (secondsRemaining === 0){
		alert("Check your food!!");
		clearInterval(intervalHandle);
		resetPage();
	}

	//subtract from seconds remaining
	secondsRemaining--;

}

function startCountdown(){

	function resetPage(){
		document.getElementById("inputArea_timer").style.display = "block";
	}

	// get countents of the "minutes" text box
	let minutes = document.getElementById("minutes").value;
	
	// check if not a number
	if (isNaN(minutes)){
		alert("Please enter a number, only in minutes:");
		return; // stops function if true
	}

	// how many seconds
	secondsRemaining = minutes * 60;
	
	//every second, call the "tick" function
	// have to make it into a variable so that you can stop the interval later!!!
	intervalHandle = setInterval(tick, 1000);

	// hide the form
	//document.getElementById("inputArea").style.display = "none";


}

window.onload = function(){

	// create input text box and give it an id of "min"
	let inputMinutes = document.createElement("input");
	inputMinutes.setAttribute("id", "minutes");
	inputMinutes.setAttribute("type", "text");
	
	//create a button
	let startButton = document.createElement("input");
	startButton.setAttribute("type","button");
	startButton.setAttribute("value","Start Countdown");
	startButton.onclick = function(){
		startCountdown();
	};

	//add to the DOM, to the div called "inputArea"
	document.getElementById("inputArea_timer").appendChild(inputMinutes);
	document.getElementById("inputArea_timer").appendChild(startButton)		

}


