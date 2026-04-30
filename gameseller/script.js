const games = [
    { title: "Halo 3", creator: "Bungie", year: "2007", price: "$47.99 USD", img: "images/halo3.jpg", desc: "Finish the fight in this epic conclusion to the original trilogy.", specs: ["OS: Windows 7", "Processor: Intel Core i3"], trailerId: "Gpaz0etTqJw" },
    { title: "Forza Horizon 3", creator: "Playground Games", year: "2016", price: "$59.99 USD", img: "images/forza3.jpg", desc: "You're in charge of the Horizon Festival. Customize everything, hire and fire your friends, and explore Australia in over 350 of the world's greatest cars.", specs: ["OS: Windows 10", "Processor: Intel i7", "Graphics: NVIDIA GTX 970"], trailerId: "cEOMPZalKvQ" },
    { title: "Doom Eternal", creator: "id Software", year: "2020", price: "$59.99 USD", img: "images/doom.jpg", desc: "Hell's armies have invaded Earth. Become the Slayer in an epic single-player campaign.", specs: ["OS: Windows 10", "Processor: Intel i5"], trailerId: "FkklG9ma0vM" }
];

// --- LOGIK FÖR DETALJSIDAN ---
if (window.location.pathname.includes('details.html')) {
    window.onload = function() {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        if (id !== null && games[id]) {
            const game = games[id];
            document.getElementById("game-title").innerText = game.title;
            document.getElementById("game-meta").innerText = game.creator + " | Released: " + game.year;
            document.getElementById("game-desc").innerText = game.desc;
            document.getElementById("game-price").innerText = game.price;
            document.getElementById("game-img").src = game.img;
            document.title = game.title + " - GameFlip";

            const specsList = document.getElementById("game-specs");
            if (game.specs) { 
                game.specs.forEach(spec => {
                    const li = document.createElement("li");
                    li.innerText = spec;
                    specsList.appendChild(li);
                });
            }

            const trailerBtn = document.getElementById("open-trailer-btn");
            if (trailerBtn) {
                trailerBtn.onclick = function() {
                    openTrailer(game.trailerId); 
                };
            }
        }
    };
}

// --- SORTERING / FILTRERING (DETTA SAKNADES) ---
function filtergames(category) {
    const gameCards = document.querySelectorAll(".game");

    gameCards.forEach(card => {
        // Om vi väljer 'all', visa alla. Annars kolla om kortet har klassen (xbox, ps5, pc)
        if (category === "all" || card.classList.contains(category)) {
            card.style.display = "flex"; // Använd flex för att behålla din snygga design
        } else {
            card.style.display = "none";
        }
    });
}

// --- TRAILER FUNKTIONER ---
function openTrailer(videoCode) {
    const popup = document.getElementById("trailer-popup");
    const iframe = document.getElementById("trailer-video");
    if (popup && iframe) {
        iframe.src = "https://www.youtube.com/embed/" + videoCode + "?autoplay=1";
        popup.style.display = "flex";
    }
}

function closeTrailer() {
    const popup = document.getElementById("trailer-popup");
    const iframe = document.getElementById("trailer-video");
    if (popup && iframe) {
        popup.style.display = "none";
        iframe.src = ""; 
    }
}

// --- SÖKFUNKTIONER ---
function searchGames() {
    const input = document.getElementById("search").value.toLowerCase();
    const gameCards = document.querySelectorAll(".game");
    gameCards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();
        card.style.display = title.includes(input) ? "flex" : "none";
    });
}

function showSuggestions() {
    const input = document.getElementById("search").value.toLowerCase();
    const suggestionsBox = document.getElementById("suggestions");
    if (!suggestionsBox) return;
    suggestionsBox.innerHTML = ""; 
    if (input === "") return;
    games.forEach((game, index) => {
        if (game.title.toLowerCase().startsWith(input)) {
            const div = document.createElement("div");
            div.className = "suggestion-item";
            div.innerText = game.title;
            div.onclick = () => {
                document.getElementById("search").value = game.title;
                searchGames();
                suggestionsBox.innerHTML = "";
            };
            suggestionsBox.appendChild(div);
        }
    });
}