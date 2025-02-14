
document.addEventListener('DOMContentLoaded', async function() {
    async function loadFavorites() {
        try {
            const response = await fetch('https://tender-verbose-class.glitch.me/song');
            const allMovies = await response.json();
            const playCounts = JSON.parse(localStorage.getItem('playCounts')) || {};

            const favoriteSongs = [];
            allMovies.forEach(movie => {
                movie.songs.forEach(song => {
                    const key = `${movie.moviename}_${song.songname}`;
                    if (playCounts[key] > 1) {
                        favoriteSongs.push({
                            ...song,
                            movieName: movie.moviename,
                            playCount: playCounts[key]
                        });
                    }
                });
            });

            renderFavorites(favoriteSongs);
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
    }

    function renderFavorites(songs) {
        const container = document.getElementById('favoritesContainer');
        container.innerHTML = '';

        if (songs.length === 0) {
            container.innerHTML = '<p>No favorite songs yet. Play some songs more than once!</p>';
            return;
        }

        songs.forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'col-md-4 song-card';
            songCard.innerHTML = `
                <div class="card">
                    <img src="${song.Album}" class="card-img-top" alt="${song.songname}">
                    <div class="card-body">
                        <h5 class="card-title">${song.songname}</h5>
                        <p class="card-text">Movie: ${song.movieName}</p>
                        <p class="card-text">Singer: ${song.singer}</p>
                        <p class="card-text">Played ${song.playCount} times</p>
                    </div>
                </div>
            `;
            container.appendChild(songCard);
        });
    }

    await loadFavorites();
});