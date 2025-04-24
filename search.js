// Script untuk fitur pencarian
document.addEventListener("DOMContentLoaded", () => {
  console.log("Search script loaded")

  const searchInput = document.querySelector(".search-input")
  const searchResults = document.querySelector(".search-results")
  const searchLoading = document.querySelector(".search-loading")

  // Periksa apakah elemen ditemukan
  if (!searchInput) console.error("Search input not found")
  if (!searchResults) console.error("Search results container not found")
  if (!searchLoading) console.error("Search loading indicator not found")

  let searchTimeout = null

  // Fungsi untuk melakukan pencarian
  function performSearch(query) {
    console.log("Performing search for:", query)

    // Tampilkan loading hanya saat melakukan pencarian
    if (searchLoading) searchLoading.classList.add("active")

    // Fetch API untuk mencari game
    fetch(`search_games.php?query=${encodeURIComponent(query)}`)
      .then((response) => {
        console.log("Search response status:", response.status)
        return response.json()
      })
      .then((data) => {
        console.log("Search results:", data)

        // Sembunyikan loading
        if (searchLoading) searchLoading.classList.remove("active")

        if (data.success) {
          // Tampilkan hasil pencarian
          renderSearchResults(data.games, query)
        } else {
          // Tampilkan pesan error
          if (searchResults) {
            searchResults.innerHTML = `<div class="no-results">${data.message || "Terjadi kesalahan saat mencari."}</div>`
            searchResults.classList.add("active")
          }
        }
      })
      .catch((error) => {
        console.error("Error:", error)
        if (searchLoading) searchLoading.classList.remove("active")
        if (searchResults) {
          searchResults.innerHTML = '<div class="no-results">Terjadi kesalahan saat mencari.</div>'
          searchResults.classList.add("active")
        }
      })
  }

  // Fungsi untuk menampilkan hasil pencarian
  function renderSearchResults(games, query) {
    // Jika tidak ada hasil
    if (games.length === 0) {
      if (searchResults) {
        searchResults.innerHTML = '<div class="no-results">Tidak ada hasil yang ditemukan.</div>'
        searchResults.classList.add("active")
      }
      return
    }

    // Buat HTML untuk hasil pencarian
    let resultsHTML = ""

    games.forEach((game) => {
      // Highlight query di nama game
      const highlightedName = highlightText(game.name, query)

      resultsHTML += `
        <div class="search-result-item" data-id="${game.id}">
          <img src="${game.logo_url}" alt="${game.name}" class="search-result-logo">
          <div class="search-result-info">
            <div class="search-result-name">${highlightedName}</div>
            <div class="search-result-publisher">${game.publisher}</div>
          </div>
        </div>
      `
    })

    // Tampilkan hasil pencarian
    if (searchResults) {
      searchResults.innerHTML = resultsHTML
      searchResults.classList.add("active")

      // Tambahkan event listener untuk item hasil pencarian
      document.querySelectorAll(".search-result-item").forEach((item) => {
        item.addEventListener("click", () => {
          const gameId = item.getAttribute("data-id")
          // Redirect ke halaman detail game atau lakukan aksi lain
          alert(`Anda memilih game dengan ID: ${gameId}`)
          // Sembunyikan hasil pencarian
          searchResults.classList.remove("active")
          // Reset input pencarian
          if (searchInput) searchInput.value = ""
        })
      })
    }
  }

  // Fungsi untuk highlight teks yang dicari
  function highlightText(text, query) {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    return text.replace(regex, '<span class="highlight">$1</span>')
  }

  // Event listener untuk input pencarian
  if (searchInput) {
    // Pastikan loading tidak aktif saat halaman dimuat
    if (searchLoading) searchLoading.classList.remove("active")

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.trim()
      console.log("Search input:", query)

      // Clear timeout sebelumnya
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }

      // Jika query kosong, sembunyikan hasil pencarian dan loading
      if (query === "") {
        if (searchResults) searchResults.classList.remove("active")
        if (searchLoading) searchLoading.classList.remove("active")
        // Hapus hasil pencarian saat input kosong
        searchResults.innerHTML = ""
        return
      }

      // Set timeout untuk debounce (mengurangi jumlah request)
      searchTimeout = setTimeout(() => {
        performSearch(query)
      }, 300)
    })

    // Tambahkan event untuk focus pada input
    searchInput.addEventListener("focus", () => {
      // Jika ada query dan hasil pencarian, tampilkan kembali
      if (searchInput.value.trim() !== "" && searchResults.children.length > 0) {
        searchResults.classList.add("active")
      }
    })
  }

  // Sembunyikan hasil pencarian saat klik di luar
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar") && !e.target.closest(".search-results")) {
      if (searchResults) searchResults.classList.remove("active")
    }
  })
})