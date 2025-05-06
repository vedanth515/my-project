
let songsData = JSON.parse(localStorage.getItem("songs")) || [];
let currentIndex = 0;
let audio = new Audio(songsData.length ? songsData[0].url : '');
audio.volume = 1;

const playerContainer = document.getElementById("player");
const nowPlayingText = document.getElementById("nowPlaying");
const searchInput = document.getElementById("searchInput");

// Function to render songs
function renderSongs(data) {
  playerContainer.innerHTML = "";
  data.forEach((ele, index) => {
    const card = document.createElement("div");
    card.className = "song-card";
    card.innerHTML = `
      <img src="${ele.Album}" alt="${ele.songname}" />
      <h4>${ele.songname}</h4>
      <p>MusicDirector [${ele.music}]</p>
    `;
    card.addEventListener("click", () => {
      currentIndex = index;
      playSong(currentIndex);
    });
    playerContainer.appendChild(card);
  });
}
renderSongs(songsData);

// Real-time case-insensitive search
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = songsData.filter(song => song.songname.toLowerCase().includes(query));
  renderSongs(filtered.length ? filtered : songsData);
});

// Controls
document.getElementById("volumeSlider").addEventListener("input", e => {
  audio.volume = e.target.value;
});

document.getElementById("progressBar").addEventListener("input", e => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    document.getElementById("progressBar").value = (audio.currentTime / audio.duration) * 100;
  }
});

function togglePlay() {
  if (audio.paused) {
    audio.play();
    document.getElementById("playPauseBtn").textContent = "⏸";
  } else {
    audio.pause();
    document.getElementById("playPauseBtn").textContent = "⏯";
  }
}

function changeSong(direction, index) {
  if (direction === "next") {
    currentIndex = (index + 1) % songsData.length;
  } else if (direction === "prev") {
    currentIndex = (index - 1 + songsData.length) % songsData.length;
  }
  playSong(currentIndex);
}

function playSong(index) {
  audio.src = songsData[index].url;
  audio.play();
  nowPlayingText.textContent = `Playing : ${songsData[index].songname}`;
  document.getElementById("playPauseBtn").textContent = "⏸";
}

function shuffleSong(current) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songsData.length);
  } while (randomIndex === current);
  currentIndex = randomIndex;
  playSong(currentIndex);
}

function toggleRepeat() {
  audio.loop = !audio.loop;
  alert(`Repeat mode: ${audio.loop ? "ON" : "OFF"}`);
}
