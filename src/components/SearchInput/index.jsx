
const SearchInput = (props) => {

    const searcher = (e) => {
        props.setSearch(e.target.value)
    }

    return <div className="flex flex-column alig-center justify-around">
        <input
            className='m-10 font-space placeholder:text-slate-400 text-slate-400 block bg-zinc-950 w-full border border-stone-500 rounded-sm py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-amber-500 focus:ring-amber-500 focus:ring-1 sm:text-sm transition ease-in duration-150 delay-0'
            type='text'
            placeholder='Character Name'
            value={props.value}
            onChange={searcher}
        />
    </div>
}

export default SearchInput;