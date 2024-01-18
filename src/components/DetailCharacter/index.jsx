import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ButtonBack from '../ButtonBack';
import { fetchCharacterById } from '../Search/apiUtils'; // Suponiendo que esta función existe

const DetailCharacter = () => {
    const location = useLocation();
    const { indexCharacter } = location.state || {};

    const [characterData, setCharacterData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [setError] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            setIsLoading(true);
            try {
                const character = await fetchCharacterById(indexCharacter); // Solo carga el personaje necesario
                setCharacterData(character);
            } catch (error) {
                setError(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCharacter();
    }, [indexCharacter]);


    const colorsArray = [
        "bg-lime-500",
        "bg-green-500",
        "bg-amber-500",
        "bg-zinc-500",
        "bg-stone-500",
    ];


    return (
        <div className="font-space bg-zinc-950">
            <div className="flex items-center justify-between p-4">
                <Link to="/">
                    <ButtonBack />
                </Link>
            </div>
            {isLoading && <div className="text-center text-zinc-600">Loading...</div>}
            {characterData && (
                <div className="flex flex-col md:flex-row justify-center items-center md:items-start p-4">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/characters/${indexCharacter}.jpg`}
                        alt="Character Starwars"
                        className="rounded-lg w-40 h-40 object-cover mb-4 md:mr-8"
                    />
                    <div className="text-center md:text-left">
                        <h2 className="text-white text-2xl font-semibold mb-2">
                            {characterData.name}
                        </h2>
                        <p className="text-gray-400">Height {characterData.height} cm</p>
                        <p className="text-gray-400">Mass {characterData.mass} kg</p>
                        <p className="text-gray-400">Gender {characterData.gender}</p>
                        <div className="bg-gray-800 w-full h-px my-4" />
                        <div className="flex flex-wrap justify-center md:justify-start">
                            <div className="flex items-center mr-8 mb-4 md:mb-0">
                                <span className="text-white mr-1">Hair:</span>
                                <span className="text-gray-300">{characterData.hair_color}</span>
                            </div>
                            <div className="flex items-center mr-8 mb-4 md:mb-0">
                                <span className="text-white mr-1">Skinr:</span>
                                <span className="text-gray-300">{characterData.skin_color}</span>
                            </div>
                            <div className="flex items-center mr-8 mb-4 md:mb-0">
                                <span className="text-white mr-1">Eye color:</span>
                                <span className="text-gray-300">{characterData.eye_color}</span>
                            </div>
                            <div className="flex items-center mr-8 mb-4 md:mb-0">
                                <span className="text-white mr-1">Birth year:</span>
                                <span className="text-gray-300">{characterData.birth_year}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-white mr-1">Origin planet:</span>
                                <span className="text-gray-300">{characterData.homeworld}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-center mt-4 md:flex-row md:justify-start">
                            <span className="text-white mr-1">Films:</span>
                            <div className="flex flex-wrap items-center">
                                {characterData.films.map((film, index) => (
                                    <span
                                        key={index}
                                        className={`text-zinc-950 m-1 rounded p-2 ${colorsArray[index % colorsArray.length]}`}
                                    >
                                        {film}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            )
            }
        </div >
    );
};

export default DetailCharacter;
