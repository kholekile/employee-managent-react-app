import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

import './Styles.css'

const SearchBar = () => {

    const { setSearchQuery } = useContext(AppContext)

    const handleSearch = (e) => {
        const searchText = e.target.value
        setSearchQuery(searchText)

    }

    return (
        <div className='search-container'>
            <input className='search-input' type='text' placeholder='Search' onChange={handleSearch}/>
        </div>
    )

}

export default SearchBar;