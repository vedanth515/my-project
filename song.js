
// // async function songs() {
// //     let song = await fetch("http://localhost:3000/song")
// //     let songdata = await song.json()
// //     console.log(songdata);

// //     let parentcart=document.createElement("div")
// //     parentcart.style.width="325px"
// //     parentcart.style.textAlign="center"
// //     parentcart.style.display="grid"
// //     parentcart.style.gridTemplateColumns="repeat(3,1fr)"
// //     parentcart.style.marginLeft="200px"
// //     parentcart.style.marginTop="50px"
// //     parentcart.style.gap="30px"




// //     songdata.forEach(ele => {
// //         console.log(ele.moviename)
// //         console.log(ele.songs[0].Album)
// //         let songcart = document.createElement("div")
// //         songcart.style.border="2px solid black"
// //         songcart.className="mainCart"
// //         songcart.innerHTML=
// //         `
// //         <img src="${ele.songs[0].Album}" width="325px" height="325px"/>
// //         <h4>${ele.moviename}</h4>
// //         `

// //         parentcart.append(songcart)


// //         songcart.addEventListener("click",()=>{

// //         let data=localStorage.setItem("songs",JSON.stringify(ele.songs))
// //             location.href="./allsongs.html"
// //         })

// //     });

// //        document.body.append(parentcart)



// // }
// // songs()



// let allMovies = []; // Store all fetched movie data

// // Fetch movie data from API
// async function songs() {
//     let song = await fetch("http://localhost:3000/song");
//     let songdata = await song.json();
//     allMovies = songdata; // Store all movies for search functionality

//     renderSongs(songdata); // Display all movies initially
// }

// // Function to display movie cards dynamically
// function renderSongs(movieList) {
//     let existingParent = document.getElementById("movieContainer");
//     if (existingParent) {
//         existingParent.innerHTML = ""; // Clear previous results
//     } else {
//         existingParent = document.createElement("div");
//         // existingParent.classList.add("animate__animated", "animate__bounce");
//         existingParent.id = "movieContainer";
//         existingParent.style.width = "50%";
//         existingParent.style.textAlign = "center";
//         existingParent.style.display = "grid";
//         existingParent.style.gridTemplateColumns = "repeat(3, 1fr)";
//         existingParent.style.margin = "50px auto";
//         existingParent.style.gap = "30px";
//         document.body.append(existingParent);
//     }

//     if (movieList.length === 0) {
//         existingParent.innerHTML = "<h3>No results found</h3>";
//         return;
//     }

//     movieList.forEach(ele => {
//         console.log(ele);

//         let songcart = document.createElement("div");
//         songcart.style.border = "2px solid black";
//         songcart.style.padding = "10px";
//         songcart.style.borderRadius = "20px";
//         songcart.className = "mainCart";
//         songcart.innerHTML = `
//             <img src="${ele.songs[0].Album}"  width="290px" height="280px"/>
//             <h4>${ele.moviename}</h4>
//             <p>Singer(${ele.songs[0].music})</p>

  
//         `
//         // <p>${ele.songs[0].songname}</p>

//         songcart.addEventListener("click", () => {
//             localStorage.setItem("songs", JSON.stringify(ele.songs));
//             location.href = "./allsongs.html";
//         });

//         existingParent.append(songcart);
//     });


// }

// // Function to filter and display searched movies (case-insensitive)
// function searchSongs() {
//     let input = document.getElementById("searchInput").value.toLowerCase().trim();

//     // Filter movies based on moviename or songname
//     let filteredMovies = allMovies.filter(movie =>
//         movie.moviename.toLowerCase().includes(input) ||
//         movie.songs.some(song => song.songname.toLowerCase().includes(input))
//     );

//     renderSongs(filteredMovies); // Display filtered results

// }

// let favbtn=document.getElementById("fav")
// favbtn.addEventListener("click",(fav)=>{
//     fav.preventDefault()
//     location.href="./favorite.html"
// })




// // Fetch songs data on page load
// songs();




let allMovies = [];

// Fetch movie data from API
async function songs() {
    let song = await fetch("http://localhost:3000/song");
    let songdata = await song.json();
    allMovies = songdata;
    renderSongs(songdata);
}

// Function to display movie cards dynamically
function renderSongs(movieList) {
    let movieRow = document.getElementById("movieRow");
    movieRow.innerHTML = ""; // Clear previous results

    if (movieList.length === 0) {
        movieRow.innerHTML = "<h3 class='text-center text-white'>No results found</h3>";
        return;
    }

    movieList.forEach(ele => {
        let colDiv = document.createElement("div");
        colDiv.className = "col-lg-4 col-md-6 col-sm-12";

        let songcart = document.createElement("div");
        songcart.className = "mainCart card p-3";
        songcart.innerHTML = `
            <img src="${ele.songs[0].Album}" class="img-fluid card-img-top" />
            <h4 class="card-title mt-2">${ele.moviename}</h4>
            <p class="card-text">Singer: ${ele.songs[0].music}</p>
        `;

        songcart.addEventListener("click", () => {
            localStorage.setItem("songs", JSON.stringify(ele.songs));
            location.href = "./allsongs.html";
        });

        colDiv.appendChild(songcart);
        movieRow.appendChild(colDiv);
    });
}

// Function to search movies
function searchSongs() {
    let input = document.getElementById("searchInput").value.toLowerCase().trim();
    let filteredMovies = allMovies.filter(movie =>
        movie.moviename.toLowerCase().includes(input) ||
        movie.songs.some(song => song.songname.toLowerCase().includes(input))
    );

    renderSongs(filteredMovies);
}

// Redirect to favorite page
document.getElementById("fav").addEventListener("click", (fav) => {
    fav.preventDefault();
    location.href = "./favorite.html";
});

songs(); // Fetch songs when the page loads


