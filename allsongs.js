// let seperatesongs = document.createElement("div");
// seperatesongs.style.display = "flex";
// seperatesongs.style.flexWrap = "wrap";
// seperatesongs.style.gap = "40px";
// seperatesongs.style.justifyContent = "center";
// seperatesongs.style.marginTop = "50px";
// let allsongsData = JSON.parse(localStorage.getItem("songs"));

// console.log(allsongsData);

// // Create the container for the songs
// allsongsData.forEach((ele, index) => {
//   let songsData = document.createElement("div");
//   console.log(ele);
//   songsData.className = "seperateCards";
//   songsData.style.border = "2px solid black";
//   songsData.style.width = "325px";
//   songsData.style.height = "auto";
//   songsData.style.textAlign = "center";

//   songsData.innerHTML = `
//     <img src="${ele.Album}" width="325px" height="325px"/>
//     <h4>${ele.songname}</h4>
//     <p>${ele.singer}</p>
//     <audio controls src="${ele.url}" type="audio/mp3" id="audio-${index}"></audio>
//     <button id="prev-${index}" class="nav-btn" onclick="changeSong('prev', ${index})">Prev</button>
//     <button id="next-${index}" class="nav-btn" onclick="changeSong('next', ${index})">Next</button>
//   `
    

let seperatesongs = document.createElement("div");
seperatesongs.style.display = "flex";
seperatesongs.style.flexWrap = "wrap";
seperatesongs.style.gap = "40px";
seperatesongs.style.justifyContent = "center";
seperatesongs.style.marginTop = "50px";
let allsongsData = JSON.parse(localStorage.getItem("songs"));

console.log(allsongsData);

// Create the container for the songs
allsongsData.forEach((ele, index) => {
  let songsData = document.createElement("div");
  songsData.className = "seperateCards";
  songsData.style.border = "2px solid black";
  songsData.style.width = "325px";
  songsData.style.height = "auto";
  songsData.style.textAlign = "center";
  songsData.style.padding = "10px";

  songsData.innerHTML = `
    <img src="${ele.Album}" width="325px" height="325px"/>
    <h4>${ele.songname}</h4>
    <p>${ele.music}</p>
    <audio controls src="${ele.url}" type="audio/mp3" id="audio-${index}"></audio>
    <div class="audio" style="display: flex; justify-content: center; gap: 10px; margin-top: 10px;">
      <button class="nav-btn" onclick="changeSong('prev', ${index})">Prev</button>
      <button class="nav-btn" onclick="changeSong('next', ${index})">Next</button>
      <button class="nav-btn" onclick="shuffleSong(${index})">Shff</button>
      <button class="nav-btn" onclick="toggleRepeat(${index})">Rep</button>
    </div>
  `;
  
  // Add the song data to the container
  seperatesongs.append(songsData);
  document.body.append(seperatesongs);
});

// Function to change the song (Next or Previous)
function changeSong(direction, index) {
  let audioElement = document.getElementById(`audio-${index}`);
  let nextIndex;

  if (direction === "next") {
    nextIndex = index + 1 < allsongsData.length ? index + 1 : 0;
  } else if (direction === "prev") {
    nextIndex = index - 1 >= 0 ? index - 1 : allsongsData.length - 1;
  }

  playNewSong(index, nextIndex);
}

// Function to shuffle and play a random song
function shuffleSong(currentIndex) {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * allsongsData.length);
  } while (randomIndex === currentIndex);

  playNewSong(currentIndex, randomIndex);
}

// Function to toggle repeat mode
function toggleRepeat(index) {
  let audioElement = document.getElementById(`audio-${index}`);
  audioElement.loop = !audioElement.loop;
  alert(`Repeat mode: ${audioElement.loop ? 'ON' : 'OFF'}`);
  
}

// Function to play a new song
function playNewSong(currentIndex, newIndex) {
  let currentAudio = document.getElementById(`audio-${currentIndex}`);
  let newAudio = document.getElementById(`audio-${newIndex}`);
  let nextSong = allsongsData[newIndex];

  let songDetails = seperatesongs.querySelectorAll('.seperateCards')[newIndex];
  songDetails.querySelector("h4").textContent = nextSong.songname;
  songDetails.querySelector("p").textContent = nextSong.singer;

  currentAudio.pause();
  currentAudio.currentTime = 0;
  newAudio.src = nextSong.url;
  newAudio.play();
}

// document.addEventListener('DOMContentLoaded', function() {
//   const currentMovie = JSON.parse(localStorage.getItem('currentMovie'));
//   const songs = currentMovie.songs;
//   const movieName = currentMovie.moviename;

//   // Function to update play count
//   function updatePlayCount(songName) {
//       const key = `${movieName}_${songName}`;
//       let playCounts = JSON.parse(localStorage.getItem('playCounts')) || {};
//       playCounts[key] = (playCounts[key] || 0) + 1;
//       localStorage.setItem('playCounts', JSON.stringify(playCounts));
//   }

//   // Example play button event listener (adjust based on your actual play button setup)
//   document.querySelectorAll('.play-button').forEach(button => {
//       button.addEventListener('click', function() {
//           const songName = this.dataset.songname;
//           updatePlayCount(songName);
//       });
//   });
// });