import { useState, useEffect } from "react";
import { usePopper } from "react-popper";
import ContentLoader from "react-content-loader";
import { Portal } from "../Portal";
import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput";
import Charging from "../Charging";
import { fetchCharacters } from "./apiUtils";

const Search = () => {
    //Set hooks
    const [characters, setCharacters] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [showPopover, setShowPopover] = useState(false);
    const [referenceElement, setReferenceElement] = useState();
    const [popperElement, setPopperElement] = useState();
    const { styles, attributes } = usePopper(referenceElement, popperElement);

    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [indexCharacter, setIndexCharacter] = useState(null);
    const navigate = useNavigate();

    //Set selectedCharacter and activate Popover
    const handleRowClick = (character, trRef, index) => {
        setSelectedCharacter(character);
        setReferenceElement(trRef);
        setIndexCharacter(index);
        setShowPopover(true);
    };

    //Send selectedCharacter and set index
    const sendSelectedCharacter = (selectedCharacter) => {
        navigate("/detailCharacter", {
            state: { selectedCharacter, indexCharacter },
        });
    };

    //Communication with API call, storage this data in local
    useEffect(() => {
        const storedCharacters = localStorage.getItem("characters");
        if (storedCharacters) {
            setCharacters(JSON.parse(storedCharacters));
            setLoading(false);
        } else {
            fetchCharacters()
                .then((data) => {
                    setCharacters(data);
                    setLoading(false);
                    localStorage.setItem("characters", JSON.stringify(data));
                })
                .catch((error) => {
                    console.error("Error fetching characters:", error);
                    setLoading(false);
                });
        }

        const handleBeforeUnload = () => {
            localStorage.removeItem("characters");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    //Filter characters
    let results = [];
    if (!search) {
        results = characters;
    } else {
        results = characters.filter((data) =>
            data.name.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <div className="flex flex-col items-center justify-center mt-10 sm:mt-40">
            <h1 className="text-4xl font-thin text-white font-space text-amber-500">
                Star Wars API
            </h1>
            <SearchInput value={search} setSearch={setSearch} />
            {loading ? (
                <div className="flex justify-center items-center">
                    <ContentLoader
                        viewBox="0 0 400 160"
                        height={170}
                        width={500}
                        backgroundColor="transparent"
                    >
                        <rect x="50" y="20" rx="3" ry="3" width="150" height="50" />
                        <rect x="210" y="20" rx="3" ry="3" width="150" height="50" />
                        <rect x="50" y="80" rx="3" ry="3" width="150" height="200" />
                        <rect x="210" y="80" rx="3" ry="3" width="150" height="200" />
                    </ContentLoader>

                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="overflow-x-auto">
                        <table className="w-full sm:w-2/3 lg:w-full mx-auto mt-3 font-space">
                            <caption className="p-3 text-md text-neutral-700 font-semibold caption-bottom bg-stone-400 border-b-2 border-neutral-300">
                                Characters Star Wars
                            </caption>
                            <thead className="bg-stone-300 border-b-2 border-neutral-300">
                                <tr>
                                    <th className="p-3 text-base font-semibold tracking-wide text-left text-neutral-700">
                                        NAME
                                    </th>
                                    <th className="p-3 text-base font-semibold tracking-wide text-left text-neutral-700">
                                        HEIGHT
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((character, index) => (
                                    <tr
                                        key={index}
                                        ref={setReferenceElement}
                                        onClick={(e) => handleRowClick(character, e.target, index + 1)}
                                        className="bg-stone-400 hover:bg-stone-300 cursor-pointer transition ease-in duration-150 delay-0"
                                    >
                                        <td className="p-3 text-base text-neutral-700">{character.name}</td>
                                        <td className="p-3 text-base text-neutral-700">
                                            {character.height !== "unknown" ? character.height + " cm" : "Unknown Height"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {showPopover && (
                <Portal>
                    <div
                        className="font-space flex flex-col justify-between items-center sm:items-start z-10 bg-zinc-900 text-stone-200 p-4 rounded-lg shadow-2xl"
                        ref={setPopperElement}
                        style={styles.popper}
                        {...attributes.popper}
                    >
                        <div className="flex flex-col space-y-2">
                            <div className="text-2xl sm:text-3xl font-semibold tracking-wide text-lima-400 transition duration-300 ease-in-out text-center">
                                {selectedCharacter.name}
                            </div>
                            <div className="text-center">
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-base sm:text-lg tracking-wide">
                                        <span className="bg-gray-800 px-2 py-1 rounded mr-4">Height</span>
                                    </span>
                                    <span className="text-base sm:text-lg text-stone-200 tracking-wide ml-auto">
                                        {selectedCharacter.height} cm
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-base sm:text-lg tracking-wide">
                                        <span className="bg-zinc-800 px-2 py-1 rounded">Mass</span>
                                    </span>
                                    <span className="text-base sm:text-lg text-stone-200 tracking-wide ml-auto">
                                        {selectedCharacter.mass} kg
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-base sm:text-lg tracking-wide">
                                        <span className="bg-green-500 px-2 py-1 rounded">Gender</span>
                                    </span>
                                    <span className="text-base sm:text-lg text-stone-200 tracking-wide ml-auto">
                                        {selectedCharacter.gender}
                                    </span>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="flex flex-row items-center justify-between">
                                    <span className="text-base sm:text-lg tracking-wide">
                                        <span className="bg-amber-700 px-2 py-1 rounded">Year</span>
                                    </span>
                                    <span className="text-base sm:text-lg text-stone-200 tracking-wide ml-auto">
                                        {selectedCharacter.birth_year}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => sendSelectedCharacter(selectedCharacter)}
                            className="items-center bg-gray-800 hover:bg-gray-700 text-base sm:text-lg text-stone-200 tracking-wider py-2 px-4 rounded mt-5 transition duration-300 ease-in-out mx-auto"
                            style={{ backgroundColor: "#green-500" }}
                        >
                            Know More
                        </button>
                    </div>
                </Portal>
            )}
        </div>
    );
};

export default Search;