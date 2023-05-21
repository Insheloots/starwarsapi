import { useState, useEffect } from "react";
import SearchInput from "../SearchInput";
import Charging from "../Charging";
import { usePopper } from "react-popper";
import { Portal } from "../Portal";
const Search = () => {
    // Set de Hooks
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    //Filter search
    let results = [];
    if (!search) {
        results = characters;
    } else {
        results = characters.filter((data) =>
            data.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
    }

    //API Call
    useEffect(() => {
        async function fetchData() {
            const URL_API_PEOPLE = 'https://swapi.dev/api/people/';
            let allCharacters = [];
            let nextUrl = URL_API_PEOPLE;
            try {

                while (nextUrl) {
                    const response = await fetch(nextUrl);
                    const data = await response.json();
                    allCharacters = allCharacters.concat(data.results);
                    nextUrl = data.next;
                }
                const mappedCharacters = allCharacters.map(character => ({
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    gender: character.gender
                }));

                setCharacters(mappedCharacters);
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    //Popup logic
    const [showPopover, setShowPopover] = useState(false);

    let [referenceElement, setReferenceElement] = useState();
    let [popperElement, setPopperElement] = useState();

    let { styles, attributes } = usePopper(referenceElement, popperElement);

    //Capture selected character
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    const handleRowClick = (character, trRef) => {
        setSelectedCharacter(character);
        setReferenceElement(trRef);
        setShowPopover(true);
    };

    return (<div className="flex flex-col items-center justify-center mt-40">

        <h1 className="text-4xl font-thin text-white font-space text-amber-500" >Star Wars API</h1>

        <SearchInput
            value={search}
            setSearch={setSearch}
        />
        {loading ? (
            <div className="flex justify-center items-center">
                <Charging />
            </div>
        ) : (
            <table className="w-1/4 mt-3 font-space">
                <caption className="p-3 text-md text-gray-500 font-semibold caption-bottom bg-gray-300 border-b-2 border-gray-200">Characters Star Wars</caption>
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                        <th className="p-3 text-base font-semibold tracking-wide text-left">NAME</th>
                        <th className="p-3 text-base font-semibold tracking-wide text-left">HEIGH</th>
                    </tr>
                </thead>
                <tbody>
                    {<Charging /> && results.map((character, index) => (
                        <tr
                            key={index}
                            ref={setReferenceElement}
                            onClick={(e) => handleRowClick(character, e.target)}
                            className="bg-white hover:bg-gray-100 cursor-pointer transition ease-in duration-150 delay-0"
                        >
                            <td className="p-3 text-base text-gray-700">{character.name}</td>
                            <td className="p-3 text-base text-gray-700">{character.height !== 'unknown' ? character.height + ' cm' : 'Unknown Height'}</td>
                        </tr>
                    ))}
                </tbody>
                <Portal>
                    {showPopover && (
                        <div
                            className="font-teko flex flex-col justify-around items-start z-10 bg-gray-900 text-white p-4 rounded-lg"
                            ref={setPopperElement}
                            style={styles.popper}
                            {...attributes.popper}
                        >
                            <div className="flex flex-col space-y-2">
                                <div className="text-3xl font-semibold tracking-wide bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">{selectedCharacter.name}</div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl text-gray-300 tracking-wide">Height:</span>
                                    <span className="text-gray-400 text-2xl tracking-wide">{selectedCharacter.height} cm</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl text-gray-300 tracking-wide">Mass:</span>
                                    <span className="text-gray-400 text-2xl tracking-wide">{selectedCharacter.mass} kg</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl text-gray-300 tracking-wide">Gender:</span>
                                    <span className="text-gray-400 text-2xl tracking-wide">{selectedCharacter.gender}</span>
                                </div>
                            </div>
                            <button className="items-center bg-gray-800 hover:bg-gray-700 text-2xl text-gray-300 tracking-wider py-2 px-4 rounded mt-5">
                                Know More
                            </button>
                        </div>
                    )}
                </Portal>
            </table>
        )
        }
    </div>)
}

export default Search;