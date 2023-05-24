import { Link, useLocation } from "react-router-dom";


const DetailCharacter = () => {

    const location = useLocation();
    const character = location.state?.selectedCharacter;

    return <div>
        <h1 className="text-white">{character.name}</h1>

        <Link to="/">
            <button className="items-center bg-gray-800 hover:bg-gray-700 text-2xl text-gray-300 tracking-wider py-2 px-4 rounded mt-5">
                Back
            </button>
        </Link>
    </div>
}

export default DetailCharacter;