import { Link, useLocation } from "react-router-dom";
import ButtonBack from "../ButtonBack";

const colorsArray = ["orange", "amber", "sky", "indigo", "blue"];

const DetailCharacter = () => {
    const location = useLocation();
    const character = location.state?.selectedCharacter;
    const index = location.state?.indexCharacter;


    return (
        <div className="flex items-center justify-center h-screen">
            <Link to="/">
                <ButtonBack />
            </Link>
            <div className="bg-gray-800 rounded-lg shadow-md p-4 w-1/4">
                <img
                    src={`https://starwars-visualguide.com/assets/img/characters/${index}.jpg`}
                    alt="Character Starwars"
                    className="rounded-lg w-40 h-40 object-cover mb-4"
                />
                <h2 className="text-white text-xl font-semibold mb-2">{character.name}</h2>
                <p className="text-gray-300">Descripción del personaje</p>
                <div className="bg-gray-700 w-full h-px my-4" />
                <div className="flex flex-wrap justify-between ">
                    <div className="flex flex-wrap">
                        <div className="flex items-center">
                            <span className="text-white mr-1">Año de nacimiento:</span>
                            <span className="text-gray-300 mr-4">{character.birth_year}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-white m-1 p-1">Planeta de origen:</span>
                            <span className="text-gray-300 mr-4 p-1">{character.homeworld}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <span className="text-white m-1 p-1">Films:</span>
                        {character.films.map((film, index) => (
                            <span
                                key={index}
                                className={`text-gray-300 m-1 rounded p-1 bg-${colorsArray[index % colorsArray.length]}-700`}
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