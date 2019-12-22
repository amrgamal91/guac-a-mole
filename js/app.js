/*======================
 * list of variables
 ========================*/
let gameStarted = false; /* start game flag used to switch timer on/off */
let flippedCards = []; /* list of flipped cards to compare each pair */
let matchFound = 0; /* number of matches if 8 then gamed ends (if total cards=16) */
let moves = 0; /* total number of moves */
let gameDuration = 0; /* total duration of the game */
var gameTimer = ""; /* timer method */
var hours = (minutes = seconds = 0); /* stop watch timer: hrs:mins:secs */
var score = 0;

const generateDeck = function() {
  for (let i = 0; i < 20; i++) {
    createCard(i);
  }
};

const createCard = function(id) {
  let ul = document.getElementById("gameDeck");
  let li = document.createElement("li");
  li.className = "card";
  li.id = "card-" + (id + 1);
  document.getElementById("gameDeck").appendChild(li);
};

const playGame = function() {
  startTimer();
  generateDeck();
  startPlaying();

  setInterval(redirectToEnd, 120000); // 2 minute
};

const startPlaying = function() {
  setInterval(PlayOneCycle, 2000); // 4 seconds
};

const addImage = function(id, url, index, target) {
  var img = document.createElement("img");
  img.id = id + "-" + index;
  img.src = url;
  img.width = 95;
  img.height = 95;

  var elementexist = document.getElementById(id + "-" + index);
  if (!elementexist) {
    target.appendChild(img);
  }
};

const handleCardOpening = function(id, index, target) {
  target.classList.add("open");
  target.classList.add("show");
  var avocadoCard = document.getElementById(id + "-" + index);
  avocadoCard.addEventListener("click", function() {
    IncrementScore();
    var element = document.getElementById(id + "-" + index);
    element.parentNode.removeChild(element);
    addImage("guacmoleImage", "./img/guac.png", index, target);
  });
};

const IncrementScore = function() {
  score += 5;
  var scoreValue = document.getElementById("score-value");
  scoreValue.innerText = score;
};

const handleCardClosing = function(avocadoId, gucamoleId, index, target) {
  setTimeout(function() {
    var element = document.getElementById(gucamoleId + "-" + index);
    if (element) {
      element.parentNode.removeChild(element);
    } else {
      var element = document.getElementById(avocadoId + "-" + index);
      element.parentNode.removeChild(element);
    }

    target.classList.remove("open");
    target.classList.remove("show");
    target.innerHTML = "";
  }, 1500);
};

const handlePlay = function(index, arr) {
  arr[index].innerHTML = "";
  arr[index].addEventListener(
    "click",
    function(evt) {
      //1-add avocado icon
      addImage("avocadoImage", "./img/avocado.png", index, evt.target);
      //2-handle click
      handleCardOpening("avocadoImage", index, evt.target);
      //3-close card
      handleCardClosing("guacmoleImage", "avocadoImage", index, evt.target);
    },
    false
  );
  arr[index].dispatchEvent(event);
};
const PlayOneCycle = function() {
  let cards = document.getElementsByClassName("card");
  let index = Math.floor(Math.random() * 19) + 1;
  let index_2 = Math.floor(Math.random() * 19) + 1;
  var event = new Event("click");
  console.log("card index : " + index);

  if (cards[index] && cards[index_2]) {
    let arrayOfCards = [cards[index], cards[index_2]];
    arrayOfCards.forEach(function(elem) {
      elem.innerHTML = "";
      elem.addEventListener(
        "click",
        function(evt) {
          //1-add avocado icon
          addImage("avocadoImage", "./img/avocado.png", index, evt.target);
          //2-handle click
          handleCardOpening("avocadoImage", index, evt.target);
          //3-close card
          handleCardClosing("guacmoleImage", "avocadoImage", index, evt.target);
        },
        false
      );
      elem.dispatchEvent(event);
    });
  }
  // if (cards[index]) {
  //   cards[index].innerHTML = "";

  //   cards[index].addEventListener(
  //     "click",
  //     function(evt) {
  //       //1-add avocado icon
  //       addImage("avocadoImage", "./img/avocado.png", index, evt.target);
  //       //2-handle click
  //       handleCardOpening("avocadoImage", index, evt.target);
  //       //3-close card
  //       handleCardClosing("guacmoleImage", "avocadoImage", index, evt.target);
  //     },
  //     false
  //   );
  //   cards[index].dispatchEvent(event);
  // }
};

const redirectToEnd = function() {
  localStorage.setItem("score", score);
  window.location.href = "end.html";
};

const emptyFlippedCards = function() {
  flippedCards = [];
};

const resetStarRating = function() {
  let stars = document.getElementsByClassName("stars");
  let childcounts = stars[0].childElementCount;
  for (var i = 0; i < childcounts; i++) {
    if (stars[0].children[i].children[0].classList.contains("fa-star-o")) {
      stars[0].children[i].children[0].classList.remove("fa-star-o");
      stars[0].children[i].children[0].classList.add("fa-star");
    }
  }
};

const resetGame = function() {
  gameStarted = false;
  matchFound = 0;
  moves = 0;
  emptyFlippedCards();
  while (document.getElementById("gameDeck").hasChildNodes()) {
    document
      .getElementById("gameDeck")
      .removeChild(document.getElementById("gameDeck").lastChild);
  }
  document.getElementsByClassName("moves")[0].innerText = 0;
  resetStarRating();
  gameDuration = document.getElementsByClassName("timer")[0].innerText;
  document.getElementsByClassName("timer")[0].innerText = "00:00:00";
  stopTimer();
  playGame();
};

const startTimer = function() {
  hours = 0;
  minutes = 1;
  seconds = 60;

  gameTimer = setInterval(function() {
    seconds--;

    if (seconds == 60) {
      seconds = 0;
      minutes--;
    }

    if (minutes == 60) {
      minutes = 0;
      hours--;
    }
    // Compose the string for display
    var currentTimeString =
      (hours < 10 ? "0" : "") +
      hours +
      ":" +
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds;
    document.getElementsByClassName("timer")[0].innerText = currentTimeString;
    if (minutes == 0 && seconds < 11) {
      document.getElementsByClassName("timer")[0].style.color = "red";
      document.getElementsByClassName("timer")[0].style.fontWeight = "900";
      document.getElementsByClassName("timer")[0].classList.add("pulseit");
    }
  }, 1000);
};

const stopTimer = function() {
  clearInterval(gameTimer);
};

//start the game
playGame();
