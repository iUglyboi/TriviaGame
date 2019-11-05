$(document).ready(function() {
  $("#remaining-time").hide();
  $("#start").on("click", trivia.startGame);
  $(document).on("click", ".option", trivia.guessChecker);
});

var trivia = {
  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: "",

  questions: {
    q1: "What type of farm does Dwight own?",
    q2: "What name did Pam and Angela fight over for their babies?",
    q3: "Where does Jim tell Pam about his feelings?",
    q4: "Which of Angela's cats does Dwight freeze?",
    q5: "What tattoo is Andy forced to get?",
    q6:
      "Which cast member was having an affair with Angela's fiancé, the senator?",
    q7: "Which strain of marijuana does Creed identify?"
  },
  options: {
    q1: ["Beet", "Apple", "Potato", "Cow"],
    q2: ["Andrew", "William", "Christopher", "Philip"],
    q3: [
      "The Warehouse",
      "The Office",
      "The Parking Lot",
      'During "smushing"(;'
    ],
    q4: ["Sparkles", "Bandit", "Sprinkles", "Jason"],
    q5: ["A Wolf", "A Nard Dog", "Tuna", "A Naked Man"],
    q6: ["Jim", "Andy", "Kelly", "Oscar"],
    q7: ["Sour Diesel", "Northern Lights", "Purple Haze", "Creed Supreme"]
  },
  answers: {
    q1: "Beet",
    q2: "Philip",
    q3: "The Parking Lot",
    q4: "Sprinkles",
    q5: "A Nard Dog",
    q6: "Oscar",
    q7: "Northern Lights"
  },

  startTrivia: function() {
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    $("#game").show();

    $("#results").html("");

    $("#timer").text(trivia.timer);

    $("#start").hide();

    $("#remaining-time").show();

    trivia.nextQuestion();
  },
  nextQuestion: function() {
    trivia.timer = 5;
    $("timer").removeClass("last-seconds");
    $("timer").text(trivia.timer);

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    $.each(questionOptions, function(index, key) {
      $("#options").append(
        $('<button class="option btn btn-info btn-lg">' + key + "</button>")
      );
    });
  },

  timerRunning: function() {
    if (
      trivia.timer > -1 &&
      trivia.currentSet < Object.keys(trivia.questions).length
    ) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $("#timer").addClass("last-seconds");
      }
    } else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html(
        "<h3>Out of time! The answer was " +
          Object.values(trivia.answers)[trivia.currentSet] +
          "</h3>"
      );
    } else if (trivia.currentSet === Object.keys(trivia.questions).length) {
      $("#results").html(
        "<h3>Thank you for playing!</h3>" +
          "<p>Correct: " +
          trivia.correct +
          "</p>" +
          "<p>Incorrect: " +
          trivia.incorrect +
          "</p>" +
          "<p>Unaswered: " +
          trivia.unanswered +
          "</p>" +
          "<p>Please play again!</p>"
      );

      $("#game").hide();

      $("#start").show();
    }
  },

  guessChecker: function() {
    var resultId;

    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if ($(this).text() === currentAnswer) {
      $(this)
        .addClass("btn-success")
        .removeClass("btn-info");

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#results").html("<h2>Correct Answer!</h2>");
    } else {
      $(this)
        .addClass("btn-danger")
        .removeClass("btn-info");

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("results").html(
        "<h2>Better luck next time! " + currentAnswer + "</h2>"
      );
    }
  },

  guessResult: function() {
    trivia.currentSet++;

    $(".option").remove();
    $("#reults h3").remove();

    trivia.nextQuestion();
  }
};
