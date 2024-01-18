const fetchCharacters = async () => {
    try {
        const url = 'https://swapi.dev/api/people/';
        const allCharacters = await fetchAllCharacters(url);
        return allCharacters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw new Error('Failed to fetch characters'); // Propaga un error más informativo
    }
};

async function fetchAllCharacters(url) {
    const response = await fetch(url);
    const data = await response.json();

    const characters = data.results.map(async (character) => {
        const homeworldData = await fetch(character.homeworld);
        const filmsData = await Promise.all(
            character.films.map((filmUrl) => fetch(filmUrl))
        );

        return {
            name: character.name,
            height: character.height,
            mass: character.mass,
            hair_color: character.hair_color,
            skin_color: character.skin_color,
            eye_color: character.eye_color,
            birth_year: character.birth_year,
            gender: character.gender,
            homeworld: (await homeworldData.json()).name,
            films: (await Promise.all(filmsData.map((response) => response.json()))).map(
                (film) => film.title
            ), // Extrae los títulos de las películas
        };
    });

    return Promise.all(characters);
}

export { fetchCharacters };
