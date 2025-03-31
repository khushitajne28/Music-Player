// Sample Songs Data
const songs = [
    { title: "Song 1", artist: "Artist 1", genre: "Pop", file: "song1.mp3" },
    { title: "Song 2", artist: "Artist 2", genre: "Rock", file: "song2.mp3" },
    { title: "Song 3", artist: "Artist 1", genre: "Jazz", file: "song3.mp3" },
    { title: "Song 4", artist: "Artist 3", genre: "Classical", file: "song4.mp3" },
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const volumeRange = document.getElementById("volume-range");
const searchInput = document.getElementById("search");
const playlist = document.getElementById("playlist");

// Load song into player
function loadSong(index) {
    const song = songs[index];
    document.getElementById("audio-source").src = song.file;
    audioPlayer.load(); // reload the audio source
    updatePlaylist();
}

// Update playlist UI
function updatePlaylist() {
    playlist.innerHTML = "";
    songs.forEach((song, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${song.title} - ${song.artist}`;
        listItem.addEventListener("click", () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audioPlayer.play();
            playPauseBtn.textContent = "Pause";
        });
        playlist.appendChild(listItem);
    });
}

// Search functionality
searchInput.addEventListener("input", () => {
    const searchQuery = searchInput.value.toLowerCase();
    const filteredSongs = songs.filter(song => {
        return song.title.toLowerCase().includes(searchQuery) || 
               song.artist.toLowerCase().includes(searchQuery) || 
               song.genre.toLowerCase().includes(searchQuery);
    });
    songs.length = 0;  // Clear current songs
    filteredSongs.forEach(song => songs.push(song)); // Add filtered songs
    updatePlaylist();
});

// Play/Pause functionality
playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "Pause";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "Play";
    }
});

// Skip to next song
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
});

// Skip to previous song
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
});

// Volume control
volumeRange.addEventListener("input", () => {
    audioPlayer.volume = volumeRange.value;
});

// Initialize
loadSong(currentSongIndex);
