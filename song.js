
let allMovies = [];

async function songs() {
    
    let song = await fetch("https://tender-verbose-class.glitch.me/song");
    let songdata = await song.json();
    allMovies = songdata;
    renderSongs(songdata); 
}

function renderSongs(movieList) {
    let existingParent = document.getElementById("movieContainer");
    if (existingParent) {
        existingParent.innerHTML = ""; // Clear previous results
    } else {
        existingParent = document.createElement("div");
        existingParent.id = "movieContainer";
        existingParent.style.width = "50%";
        existingParent.style.textAlign = "center";
        existingParent.style.display = "grid";
        existingParent.style.gridTemplateColumns = "repeat(3, 1fr)";
        existingParent.style.margin = "50px auto";
        existingParent.style.gap = "30px";
        document.body.append(existingParent);
    }

    if (movieList.length === 0) {
        existingParent.innerHTML = "<h3>No results found</h3>";
        return;
    }

    movieList.forEach(ele => {
        console.log(ele);

        let songcart = document.createElement("div");
        songcart.style.border = "2px solid black";
        songcart.style.padding = "10px";
        songcart.style.borderRadius = "20px";
        songcart.className = "mainCart";
        songcart.innerHTML = `
            <img src="${ele.songs[0].Album}"  width="290px" height="280px"/>
            <h4>${ele.moviename}</h4>
            <p>Music [${ele.songs[0].music}]</p>
        `
        // <p>${ele.songs[0].songname}</p>

        songcart.addEventListener("click", () => {
            localStorage.setItem("songs", JSON.stringify(ele.songs));
            location.href = "./allsongs.html";
        });

        existingParent.append(songcart);
    });


}

function searchSongs() {
    let input = document.getElementById("searchInput").value.toLowerCase().trim();

    let filteredMovies = allMovies.filter(movie =>
        movie.moviename.toLowerCase().includes(input) ||
        movie.songs.some(song => song.songname.toLowerCase().includes(input))
    );

    renderSongs(filteredMovies); 

}

let favbtn=document.getElementById("fav")
favbtn.addEventListener("click",(fav)=>{
    fav.preventDefault()
    location.href="./favorite.html"
})




songs();


