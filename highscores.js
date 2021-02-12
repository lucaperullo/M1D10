const highScoresList = document.querySelector("#highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
highScoresList.innerHTML = highScores
  .map((score) => {
    return `<li class"high-score">${score.name}- ${score.score}</li>`;
  })
  .join("");
let audio = document.querySelector("audio");
let playPause = 0;
const playOrPause = () => {
  if (playPause == 0) {
    playPause = 1;
    audio.play();
  } else {
    playPause = 0;
    audio.pause();
  }
};
