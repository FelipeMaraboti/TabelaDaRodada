// Mapeamento dos logos
const teamLogos = {
    'time-a': './assets/escudos/team_shield_a.png',
    'time-b': './assets/escudos/team_shield_b.png',
    'time-c': './assets/escudos/team_shield_c.png',
    'time-d': './assets/escudos/team_shield_d.png',
    'time-e': './assets/escudos/team_shield_e.png',
    'time-f': './assets/escudos/team_shield_f.png',
    'time-g': './assets/escudos/team_shield_g.png',
    'time-h': './assets/escudos/team_shield_h.png',
};

// Requisição da Api
const fetchData = async() => {
    try {
        const res = await fetch('https://sevn-pleno-esportes.deno.dev/')
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Não foi possivel realizar a busca de dados", error)
        return []
    }
}

// Partidas
let currentRound = 0;
let data = []

const renderGames = (roundData) => {
    const matchesContainer = document.getElementById('matchesContainer');
    const roundNumber = document.getElementById('roundNumber');

    matchesContainer.innerHTML = '';

    roundNumber.textContent = `Rodada ${roundData.round}`;

    roundData.games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'matches';

        gameDiv.innerHTML = `
        <div class="time" id='${game.team_home_id}'>
            <img src="${teamLogos[game.team_home_id]}" alt="escudo">
            <p>${game.team_home_name}</p>
        </div>
        <div class="placar">
            <p>${game.team_home_score}</p>
            <p class='versus'>X</p>
            <p>${game.team_away_score}</p>
        </div>
        <div class="time" id='${game.team_away_id}'>
            <p>${game.team_away_name}</p>
            <img src="${teamLogos[game.team_away_id]}" alt="escudo">
        </div>
    `

        matchesContainer.appendChild(gameDiv)
    });

    // Atualiza a desativação dos botões de navegação
    const prevButton = document.getElementById('prevRound');
    const nextButton = document.getElementById('nextRound');

    if (currentRound === 0) {
        prevButton.style.visibility = 'hidden'; // Esconde o botão "anterior" se estiver na primeira rodada
    } else {
        prevButton.style.visibility = 'visible'; // Mostra o botão "anterior" se houver rodadas anteriores
    }

    if (currentRound === data.length - 1) {
        nextButton.style.visibility = 'hidden'; // Esconde o botão "próximo" se estiver na última rodada
    } else {
        nextButton.style.visibility = 'visible'; // Mostra o botão "próximo" se houver rodadas futuras
    }
};

const updateRound = (i) => {
    if (i >= 0 && i < data.length) {
        currentRound = i
        renderGames(data[currentRound])
    }
};

document.getElementById('prevRound').addEventListener('click', () => {
    if (currentRound > 0 ) {
        updateRound(currentRound - 1)
    }
})
document.getElementById('nextRound').addEventListener('click', () => {
    if (currentRound < data.length - 1 ) {
        updateRound(currentRound + 1);
    }
})

fetchData().then(fetchedData => {
    data = fetchedData; // Atribui os dados recebidos à variável data
    renderGames(data[currentRound]); // Renderiza a primeira rodada
});


