const Popover = ({ character }) => {
    const popoverStyle = {
        position: 'fixed',
        top: '500px',
        left: '1300px',
    };
    return <div className="absolute z-10 bg-black p4 shadow" style={popoverStyle}>
        <h2 className="text-white">{character.name}</h2>
        <p className="text-white">Height: {character.height}</p>
        <p className="text-white">Mass: {character.mass}</p>
        <p className="text-white">Gender: {character.gender}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Ver más</button>
    </div>
}

export default Popover;