let currentVideoIndex = 0; // Índice del video actual
const totalVideos = 5; // Cantidad total de videos
const progressLine = document.getElementById("progress-line"); // Línea de progreso
const progressPercentage = document.getElementById("progress-percentage"); // Porcentaje de progreso
let player; // Variable para el reproductor de YouTube

// Lista de IDs de videos de YouTube
const videoIds = [
    'bW-NYf606fM',
    'udpvZv_C7js',
    'HEkfvk2PBCs',
    '7gh5MtqkIiU',
    'UblULDVT2Fs'
];

// Cargar la API de YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player('main-video', {
        height: '315',
        width: '560',
        videoId: videoIds[currentVideoIndex], // Obtener el ID del video
        events: {
            'onStateChange': onPlayerStateChange // Manejar cambios de estado
        }
    });
}

// Mostrar/ocultar la playlist
function togglePlaylist() {
    const playlist = document.getElementById("playlist");
    playlist.classList.toggle("visible"); // Cambia la visibilidad de la playlist
}

// Manejar el cambio de estado del reproductor
function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        updateProgressLine(); // Actualizar progreso al finalizar el video
        playNextVideo(); // Reproducir el siguiente video
    }
}

// Cambiar video al hacer clic en la playlist
function playVideo(videoSrc, element, index) {
    currentVideoIndex = index; // Actualizar índice actual
    player.loadVideoById(videoIds[index]); // Cambiar video usando la API
    updatePlaylistHighlight(element); // Resaltar video en la playlist
}

// Resaltar el video actual en la playlist
function updatePlaylistHighlight(activeElement) {
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(item => item.classList.remove('active')); // Quitar clase active
    activeElement.classList.add('active'); // Agregar clase active al actual
}

// Actualizar la línea de progreso
function updateProgressLine() {
    const percentage = ((currentVideoIndex + 1) / totalVideos) * 100; // Calcular el porcentaje
    progressLine.style.width = `${percentage}%`; // Cambiar ancho
    progressPercentage.textContent = `${Math.round(percentage)}%`; // Actualizar texto del porcentaje

    // Cambiar color a verde si el progreso es 100%
    if (percentage >= 100) {
        progressLine.style.backgroundColor = "green"; // Cambiar a verde
        showCompletionModal(); // Mostrar modal al completar
    } else {
        progressLine.style.backgroundColor = ""; // Restablecer color
    }
}

// Reproducir automáticamente el siguiente video al terminar
function playNextVideo() {
    if (currentVideoIndex < totalVideos - 1) {
        currentVideoIndex++;
        const nextElement = document.querySelectorAll('.playlist-item')[currentVideoIndex];
        playVideo(videoIds[currentVideoIndex], nextElement, currentVideoIndex);
    } else {
        updateProgressLine(); // Actualizar progreso para el último video
    }
}

// Mostrar ventana emergente de finalización
function showCompletionModal() {
    document.getElementById('completion-modal').style.display = 'block';
}

// Inicializar el primer video al cargar la página
window.onload = function() {
    playVideo(videoIds[0], document.querySelectorAll('.playlist-item')[0], 0);
};


/*-----------------------------------------------------------------------------------------------------------------------------
// Cambiar video al hacer clic en la playlist
function playVideo(videoSrc, element, index) {
    if (currentVideoIndex === index) return; // No hacer nada si ya está reproduciendo este video
    if (index > currentVideoIndex) return; // Bloquear si el usuario intenta saltar videos

    currentVideoIndex = index; // Actualizar índice actual
    player.loadVideoById(videoIds[index]); // Cambiar video usando la API
    updatePlaylistHighlight(element); // Resaltar video en la playlist
    updateProgressLine(); // Actualizar línea de progreso
}

// Habilitar botones de la lista de reproducción
function enablePlaylistButtons() {
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach((item, index) => {
        item.classList.remove('disabled'); // Eliminar la clase 'disabled'
        item.onclick = function() {
            playVideo(videoIds[index], item, index); // Vincular el evento de clic
        };
    });
}

// Deshabilitar botones de la lista de reproducción
function disablePlaylistButtons() {
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach((item, index) => {
        if (index > 0) { // Deshabilitar solo los videos siguientes
            item.classList.add('disabled');
            item.onclick = function() {
                return false; // Prevenir acción de clic
            };
        }
    });
}
*/