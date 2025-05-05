
let allMovies = [];

async function songs() {
    // Show loader
    document.getElementById("loader").style.display = "flex";

    try {
        let song = await fetch("https://tender-verbose-class.glitch.me/song");
        let songdata = await song.json();
        allMovies = songdata;
        renderSongs(songdata); 
    } catch (error) {
        console.error("Error fetching songs:", error);
    } finally {
        // Hide loader
        document.getElementById("loader").style.display = "none";
    }
}

function renderSongs(movieList) {
    let existingParent = document.getElementById("movieContainer");
    existingParent.innerHTML = "";

    if (movieList.length === 0) {
        existingParent.innerHTML = "<h3>No results found</h3>";
        return;
    }

    movieList.forEach(ele => {
        let songcart = document.createElement("div");
        songcart.style.border = "2px solid black";
        songcart.style.padding = "10px";
        songcart.style.borderRadius = "20px";
        songcart.className = "mainCart";
        songcart.innerHTML = `
            <img src="${ele.songs[0].Album}"  width="290px" height="280px"/>
            <h4>${ele.moviename}</h4>
            <p>Music [${ele.songs[0].music}]</p>
        `;

        songcart.addEventListener("click", () => {
            localStorage.setItem("songs", JSON.stringify(ele.songs));
            location.href = "./allsongs.html";
        });

        existingParent.append(songcart);
    });
}

// function searchSongs() {
//     let input = document.getElementById("searchInput").value.toLowerCase().trim();

//     let filteredMovies = allMovies.filter(movie =>
//         movie.moviename.toLowerCase().includes(input) ||
//         movie.songs.some(song => song.songname.toLowerCase().includes(input))
//     );

//     renderSongs(filteredMovies); 
// }


function searchSongs() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();

    // If input is empty, show all songs
    if (input === "") {
        renderSongs(allMovies);
        return;
    }

    const filteredMovies = allMovies.filter(movie =>
        movie.moviename.toLowerCase().includes(input) ||
        movie.songs.some(song => song.songname.toLowerCase().includes(input))
    );

    // If no match found, show all songs again (fallback)
    if (filteredMovies.length === 0) {
        renderSongs(allMovies);
    } else {
        renderSongs(filteredMovies);
    }
}


let favbtn = document.getElementById("fav");
favbtn.addEventListener("click", (fav) => {
    fav.preventDefault();
    location.href = "./favorite.html";
});

songs();

