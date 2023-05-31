const fetchCharacters = async () => {
    const URL_API_PEOPLE = "https://swapi.dev/api/people/";
    let allCharacters = [];
    let nextUrl = URL_API_PEOPLE;
    try {
        while (nextUrl) {
            const response = await fetch(nextUrl);
            const data = await response.json();
            allCharacters = allCharacters.concat(data.results);
            nextUrl = data.next;
        }

        const mappedCharacters = await Promise.all(
            allCharacters.map(async (character) => {
                const homeworldData = await fetchCharacterData(character.homeworld);
                const filmsData = await Promise.all(
                    character.films.map(async (film) => {
                        const filmData = await fetchCharacterData(film);
                        return filmData;
                    })
                );

                return {
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color,
                    eye_color: character.eye_color,
                    gender: character.gender,
                    birth_year: character.birth_year,
                    homeworld: homeworldData.name,
                    films: filmsData.map((film) => film.title),
                };
            })
        );

        return mappedCharacters;
    } catch (error) {
        throw error;
    }
};

const fetchCharacterData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export { fetchCharacters };