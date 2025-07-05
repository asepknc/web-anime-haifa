document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const genreTags = document.querySelectorAll('.genre-tag');
  const resultsContainer = document.getElementById('genre-results');
  const animeModal = document.getElementById('anime-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const addToWatchlistBtn = document.getElementById('add-to-watchlist');
  const watchlistContainer = document.getElementById('watchlist-anime');
  const emptyWatchlist = document.getElementById('empty-watchlist');
  const clearWatchlistBtn = document.getElementById('clear-watchlist');

  // Data
  const animeList = [
    { title: "Solo Leveling", genre: "Action, Fantasy", episodes: 12, image: "https://awsimages.detik.net.id/community/media/visual/2024/09/17/anime-solo-leveling-season-2.webp" },
    { title: "Kaiju No.8", genre: "Sci-fi, Shounen", episodes: 12, image: "https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2025/06/02/4283022946.jpg" },
    { title: "Kimetsu no Yaiba", genre: "Dark Fantasy, Adventure", episodes: 26, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT10RyUtE3xfyV5-wErPV6O-Y83gPnFd5IRJA&s" },
    { title: "My Hero Academia", genre: "Superhero, Action, Shounen", episodes: 13, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfwP7usRIxfQNj841lU1eALx_vFTlD8ZN-fA&s" },
    { title: "Jibaku shounen hanako-kun", genre: "Mystery, Fantasy, Shounen, Supernatural", episodes: 12, image: "https://m.media-amazon.com/images/M/MV5BM2MzMGRlN2QtM2FhMS00Y2FhLWE4MTEtMGNiZTU5YTdiY2JiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
    { title: "Kimi ni todoke", genre: "Romance, Drama, Comedy", episodes: 25, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8AWKTlZwvE5A45nJb2N5gwBVlZdbs_qKI5g&s" },
    { title: "kamisama kiss", genre: "Romance, Drama, Comedy, Shoujo", episodes: 13, 
        image: "https://m.media-amazon.com/images/M/MV5BYjQ2NWQ0Y2UtYzU5Yi00ZjI2LWE2MDEtMjRhZDNlZWJhOWQ3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  ];

  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  // Functions
  function renderGenreResults(filtered) {
    resultsContainer.innerHTML = '';
    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<p class="text-gray-400 col-span-full">No anime found for this genre.</p>';
      return;
    }
    filtered.forEach(anime => {
      const card = document.createElement('div');
      card.className = 'anime-card bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105';
      card.innerHTML = `
        <img src="${anime.image}" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-white font-semibold text-lg">${anime.title}</h3>
          <p class="text-gray-400">Genre: ${anime.genre}</p>
          <p class="text-gray-400">Episodes: ${anime.episodes}</p>
          <button class="bg-red-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-red-600 transition">Watch Now</button>
        </div>
      `;
      card.querySelector('button').addEventListener('click', () => openAnimeModal(anime));
      resultsContainer.appendChild(card);
    });
  }

  function openAnimeModal(anime) {
    document.getElementById('modal-anime-title').textContent = anime.title;
    document.getElementById('modal-anime-episodes').textContent = anime.episodes;
    document.getElementById('modal-anime-cover').src = anime.image;
    document.getElementById('modal-anime-genres').innerHTML = anime.genre
      .split(',').map(g => `<span class="bg-red-500 text-white text-sm px-2 py-1 rounded">${g.trim()}</span>`).join(' ');

    addToWatchlistBtn.dataset.title = anime.title;
    addToWatchlistBtn.dataset.genre = anime.genre;
    addToWatchlistBtn.dataset.episodes = anime.episodes;
    addToWatchlistBtn.dataset.image = anime.image;

    animeModal.classList.remove('hidden');
  }

  function renderWatchlist() {
    watchlistContainer.innerHTML = '';
    if (watchlist.length === 0) {
      emptyWatchlist.classList.remove('hidden');
      return;
    }
    emptyWatchlist.classList.add('hidden');
    watchlist.forEach(item => {
      const card = document.createElement('div');
      card.className = 'anime-card bg-gray-900 rounded-lg overflow-hidden shadow-lg';
      card.innerHTML = `
        <img src="${item.image}" class="w-full h-48 object-cover" alt="${item.title}">
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white">${item.title}</h3>
          <p class="text-gray-400">Genre: ${item.genre}</p>
          <p class="text-gray-400">Episodes: ${item.episodes}</p>
        </div>
      `;
      watchlistContainer.appendChild(card);
    });
  }

  // Event handlers
  addToWatchlistBtn.addEventListener('click', () => {
    const { title, genre, episodes, image } = addToWatchlistBtn.dataset;
    if (!watchlist.some(item => item.title === title)) {
      watchlist.push({ title, genre, episodes, image });
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      renderWatchlist();
      alert(`"${title}" has been added to your watchlist.`);
    } else {
      alert('Already in your watchlist!');
    }
  });

  closeModalBtn.addEventListener('click', () => {
    animeModal.classList.add('hidden');
  });

  clearWatchlistBtn.addEventListener('click', () => {
    watchlist.length = 0;
    localStorage.removeItem('watchlist');
    renderWatchlist();
  });

  genreTags.forEach(tag => {
    tag.addEventListener('click', () => {
      genreTags.forEach(t => t.classList.remove('active-genre'));
      tag.classList.add('active-genre');
      const term = tag.textContent.trim().toLowerCase();
      renderGenreResults(animeList.filter(a => a.genre.toLowerCase().includes(term)));
    });
  });

  // Initial render
  renderWatchlist();
});
