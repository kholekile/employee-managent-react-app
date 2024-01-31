import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

import { MdAddCircle } from "react-icons/md";


import SearchBar from '../SearchBar';

import './Styles.css'

const Header = () => {

    const { employeeCount, setShowAddMadel } = useContext(AppContext)

    const handleAddEmployee = () => {
        setShowAddMadel(true)
    }

    return (
        <div className='header-container'>
            <div className='employee-count'>
                <h1 className='header-employees'>Employees</h1>
                {
                    employeeCount > 0 ? <p>There are {employeeCount} employees</p> : <p> No employess</p>

                }
            </div>
            <div className='search'>
                <SearchBar />
            </div>
            <div className='add-button'>
                <button className='primary-button' onClick={handleAddEmployee}> <span><MdAddCircle /></span> Add Employee</button>
            </div>
        </div>
    )
}

export default Header