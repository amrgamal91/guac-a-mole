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
  li.id = /* "card-" + */ id;
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

const handleCardOpening = function(id, index,target) {
  // console.log("score is ..."+score);
  target.classList.add("open");
  target.classList.add("show");
  let avocadoCard = document.getElementById(id + "-" + index);
  if (avocadoCard) {
    avocadoCard.addEventListener(
      "click",
      handleAvocadoClick,
      false
    );
  }
};
function handleAvocadoClick(event) {
  let element = document.getElementById(event.target.id);
  let parent =element.parentNode;
  element && element.parentNode.removeChild(element);
  let index=event.target.id.split('-')[1];
  addImage("guacmoleImage", "./img/guac.png", index, parent);
  IncrementScore();
}

const IncrementScore = function() {
  console.log("increment score by 5 .......");
  score += 5;
  var scoreValue = document.getElementById("score-value");
  scoreValue.innerText = score;
};

const handleCardClosing = function(avocadoId, guacamoleId, index, target) {
  setTimeout(function() {
    let avocadoElement = document.getElementById(avocadoId + "-" + index);
    let guacamoleElement = document.getElementById(guacamoleId + "-" + index);
    if (avocadoElement) {
      avocadoElement.parentNode.removeChild(avocadoElement);
    }
    if (guacamoleElement) {
      guacamoleElement.parentNode.removeChild(guacamoleElement);
    }
    target.classList.remove("open");
    target.classList.remove("show");
    target.innerHTML = "";
  }, 1500);
};

const PlayOneCycle = function() {
  let cards = document.getElementsByClassName("card");
  let index = 0,
    index_2 = 1;
  do {
    index = Math.floor(Math.random() * 19) + 1;
    index_2 = Math.floor(Math.random() * 19) + 1;
  } while (index === index_2);

  var event = new Event("click");
  // console.log("card index : " + index);

  if (cards[index] && cards[index_2]) {
    let arrayOfCards = [cards[index], cards[index_2]];
    arrayOfCards.forEach(function(elem) {
      elem.innerHTML = "";
      elem.addEventListener(
        "click",
        function(evt) {
          //1-add avocado icon
          addImage("avocadoImage", "./img/avocado.png", elem.id, evt.target);
          //2-handle click
          handleCardOpening("avocadoImage", elem.id, evt.target);
          //3-close card
          handleCardClosing(
            "avocadoImage",
            "guacmoleImage",
            elem.id,
            evt.target
          );
        },
        false
      );
      elem.dispatchEvent(event);
    });
  }
};

const redirectToEnd = function() {
  localStorage.setItem("score", score);
  window.location.href = "end.html";
};

const emptyFlippedCards = function() {
  flippedCards = [];
};

const startTimer = function() {
  hours = 1;
  minutes = 1;
  seconds = 60;

  gameTimer = setInterval(function() {
    seconds--;

    if (seconds == 0) {
      seconds = 59;
      minutes--;
    }

    // if (minutes == 0) {
    //   minutes = 0;
    //   hours--;
    // }
    // Compose the string for display
    var currentTimeString =
      // (hours < 10 ? "0" : "") +
      // hours +
      // ":" +
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
