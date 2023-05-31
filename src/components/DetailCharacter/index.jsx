import { Link, useLocation } from "react-router-dom";
import ButtonBack from "../ButtonBack";

const colorsArray = ["bg-blue-900", "bg-purple-900", "bg-yellow-900", "bg-green-900", "bg-red-900"];

const DetailCharacter = () => {
    const location = useLocation();
    const character = location.state?.selectedCharacter;
    const index = location.state?.indexCharacter;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900">
            <Link to="/">
                <ButtonBack />
            </Link>
            <div className="bg-black rounded-lg shadow-lg p-4 w-1/4">
                <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${index}.jpg`}
                    alt="Character Starwars"
                    className="rounded-lg w-40 h-40 object-cover mb-4"
                />
                <h2 className="text-white text-2xl font-semibold mb-2">{character.name}</h2>
                <p className="text-gray-400">Character description</p>
                <div className="bg-gray-800 w-full h-px my-4" />
                <div className="flex flex-wrap justify-between">
                    <div className="flex flex-wrap">
                        <div className="flex items-center">
                            <span className="text-white mr-1">Birth year:</span>
                            <span className="text-gray-300 mr-4">{character.birth_year}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-white m-1 p-1">Origin planet:</span>
                            <span className="text-gray-300 mr-4 p-1">{character.homeworld}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <span className="text-white m-1 p-1">Films:</span>
                        {character.films.map((film, index) => (
                            <span
                                key={index}
                                className={`text-white m-1 rounded p-2 ${colorsArray[index % colorsArray.length]}`}
                            >
                                {film}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailCharacter;