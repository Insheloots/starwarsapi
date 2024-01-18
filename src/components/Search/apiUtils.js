const apiUrl = 'https://swapi.dev/api/people/';

const fetchCharacters = async () => {
    try {

        const allCharacters = await fetchAllCharacters(apiUrl);
        return allCharacters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw new Error('Failed to fetch characters'); // Propaga un error más informativo
    }
};

async function fetchAllCharacters(apiUrl) {
    const response = await fetch(apiUrl);
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
            ),
        };
    });

    return Promise.all(characters);
}

export const fetchCharacterById = async (id) => {
    try {
        const url = `${apiUrl}/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        const homeworldData = await fetch(data.homeworld);
        const filmsData = await Promise.all(
            data.films.map((filmUrl) => fetch(filmUrl))
        );

        return {
            ...data,
            homeworld: (await homeworldData.json()).name,
            films: (await Promise.all(filmsData.map((response) => response.json()))).map(
                (film) => film.title
            ),
        };
    } catch (error) {
        throw new Error(`Error fetching character by ID: ${error.message}`);
    }
};

export const fetchCharactersById = async (ids) => {
    try {
        const promises = ids.map((id) => fetchCharacterById(id));
        const responses = await Promise.all(promises);
        const characters = responses.map((response) => response.data);

        return characters;
    } catch (error) {
        throw new Error(`Error fetching characters by ID: ${error.message}`);
    }
};

export { fetchCharacters };
