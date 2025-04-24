console.log("Script Executed!!");

const list = [
  {
    songName: "Warriyo - Mortals [NCS Release]",
    filePath: "./music/1.mp3",
    coverPath: "./cover/1.jpg",
  },
  {
    songName: "Cielo - Huma-Huma",
    filePath: "./music/2.mp3",
    coverPath: "./cover/2.jpg",
  },
  {
    songName: "Invincible [NCS Release]-320k",
    filePath: "./music/3.mp3",
    coverPath: "./cover/3.jpg",
  },
  {
    songName: "My Heart [NCS Release]",
    filePath: "./music/4.mp3",
    coverPath: "./cover/4.jpg",
  },
  {
    songName: "Tonight-feat-Johnning-NCS-Release",
    filePath: "./music/5.mp3",
    coverPath: "./cover/5.jpg",
  },
  {
    songName: "Rabba - Salam-e-Ishq",
    filePath: "./music/6.mp3",
    coverPath: "./cover/6.jpg",
  },
  {
    songName: "Sakhiyaan - Salam-e-Ishq",
    filePath: "./music/7.mp3",
    coverPath: "./cover/7.jpg",
  },
  {
    songName: "Bhula Dena - Salam-e-Ishq",
    filePath: "./music/8.mp3",
    coverPath: "./cover/8.jpg",
  },
  {
    songName: "Tumhari Kasam - Salam-e-Ishq",
    filePath: "./music/9.mp3",
    coverPath: "./cover/9.jpg",
  },
  {
    songName: "Na Jaana - Salam-e-Ishq",
    filePath: "./music/10.mp3",
    coverPath: "./cover/10.jpg",
  },
];
let songIndex = 1;
let audioElement = new Audio("./music/1.mp3");
const playPauseBTN = document.getElementById("playPause");
const progressBar = document.getElementById("ProgressBar");
const eqGif = document.getElementById("eq-gif");
let isPlaying = false;
const songItem = Array.from(document.querySelectorAll(".album-item-layout>li"));
songItem.forEach((element, i) => {
  const audioElement = new Audio(`./music/${i + 1}.mp3`);

  audioElement.addEventListener("loadedmetadata", () => {
    const duration = audioElement.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60)
      .toString()
      .padStart(2, "0");

    const formattedDuration = `${minutes}:${seconds}`;

    element.getElementsByClassName("songLength")[0].innerHTML =
      formattedDuration;
  });

  element.getElementsByTagName("img")[0].src = list[i].coverPath;
  element.getElementsByClassName("songName")[0].innerHTML = list[i].songName;
});

function updateCurrentPlay() {
  const title = document.querySelector(".curPlaying>span");
  title.innerHTML = list[songIndex].songName;
}

function playMusic() {
  audioElement.play();
  isPlaying = true;
  playPauseBTN.classList.remove("fa-play");
  playPauseBTN.classList.add("fa-pause");
  eqGif.style.opacity = 1;
}

function pauseMusic() {
  audioElement.pause();
  isPlaying = false;
  playPauseBTN.classList.add("fa-play");
  playPauseBTN.classList.remove("fa-pause");
  eqGif.style.opacity = 0;
}

playPauseBTN.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playMusic();
  } else {
    pauseMusic();
  }
});

audioElement.addEventListener("timeupdate", () => {
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100
  );
  progressBar.value = progress;
});
progressBar.addEventListener("change", () => {
  audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});
document.addEventListener("keypress", (event) => {
  if (event.key === " " && !isPlaying) {
    playMusic();
  } else if (event.key === " " && isPlaying) {
    pauseMusic();
  }
});
document.querySelectorAll(".icons>i")[2].addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `music/${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  if (isPlaying) {
    audioElement.play();
  }
  playPauseBTN.classList.remove("fa-play-circle");
  playPauseBTN.classList.add("fa-pause-circle");
  updateCurrentPlay();
});
