// start of the game 
// button to start the game
// *TIME REMAINING: 
/* First question example. 30 seconds pick and choose correct answers. When the time is up show correct answers, incorrect answers. unanswered.
ONLY one answer per question.

What was the first full length CGI movie?
A. A Bug's life B. Monsters Inc. C. Toy Story D. The Lion King.

2nd... Question...*/

var panel = $('#quiz-area');// html line 17
var countStartNumber = 30;

//Click Events//
$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

//X-MEN questions

var questions = [{
    question: 'Magneto has the power to control what element?', //#1
    answers: ["Wind", "Metal", "Ice", "Fire"],
    correctAnswer: "Metal",
    image:"assets/images/magneto.gif"
}, {
    question: 'This X-Man has the ability to spawn portals to teleport objects and people virtually anywhere. Who is he/she?',
    answers: ["Cable", "Blink", "Nightcrawler", "Pipeline"],
    correctAnswer: "Blink",
    image:"assets/images/blink.gif"
}, {
    question: 'Who of the following was NOT a founding member of the X-Men?',
    answers: ["Marvel Girl", "Angel", "Wolverine", "Iceman"],
    correctAnswer: "Wolverine",
    image:"assets/images/wolverine.gif"
}, {
    question: 'This X-Man has the power to absorb and store any form energy, which he/she can then release at will.',
    answers: ["Gambit", "Bishop", "Sunfire", "Rogue"],
    correctAnswer: "Bishop",
    image:"assets/images/bishop.gif"
}, {
    question: 'Which of the following can NOT read minds?',
    answers: ["Psylocke", "Magneto", "Professor X", "Jean Grey"],
    correctAnswer: "Magneto",
    image:"assets/images/magneto2.gif"
}, {
    question: "This mutant is naturally impervious to Cyclops' optic blasts.",
    answers: ["Wolverine", "Havok", "Magneto", "Juggernaut"],
    correctAnswer: "Havok",
    image:"assets/images/havok.gif"
}, {
    question: "What mutant ability does Magneto's son Quicksilver have?",
    answers: ["Flight", "Magnetism", "Super speed", "Telekinesis"],
    correctAnswer: "super speed",
    image:"assets/images/quicksilver.gif"
}, {
    question: "Which of these X-Men DOESN'T have blue skin or fur?",
    answers: ["Mystique", "Nightcrawler", "Beast", "Jubilee"],
    correctAnswer: "Jubilee",
    image:"assets/images/jubilee.gif"
}, {
    question: 'Gambit uses cards to display his power. What kind of energy does he charge them up with?',
    answers: ["Kinetic", "Thermal", "Radiant", "Electrical"],
    correctAnswer: "Kinetic",
    image:"assets/images/gambit.gif"
}, {
    question: 'I am a kind hearted, handicapped man who helps mutants to face the world.',
    answers: ["Magneto", "Cyclops", "Jean", "Professor Xavier"],
    correctAnswer: "Professor Xavier",
    image:"assets/images/profX.gif"            
}];


//Game

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){ //property :local function
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');//console log
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />'); //image source

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) { //E
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() { //else incorrect answer
    game.incorrect++; // add incorrect
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};


