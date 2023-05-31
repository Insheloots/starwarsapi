const ButtonBack = () => {
    return (
        <button
            className="flex items-center px-4 py-2 rounded-lg bg-zinc-900 text-white font-space hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-gray-600 mr-2 mb-3"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M19 12H6M12 5l-7 7 7 7" />
            </svg>
            Back
        </button>
    );
}

export default ButtonBack;