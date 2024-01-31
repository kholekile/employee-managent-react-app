import { useState } from 'react';

import Main from './components/Main';

import { AppContext } from './context/AppContext';

import './GlobalStyles.css'

const App = () => {

    const [emplooyees, setEmployees] = useState([]);

    const [searchQuery, setSearchQuery] = useState("")

    const [employeeCount, setEmployeeCount] = useState(0)

    const [showAddMadel, setShowAddMadel] = useState(false)

    const [showEditMadel, setShowEditMadel] = useState(false)

    const [itemToEdit, setItemToEdit] = useState(null)

    return (

        <AppContext.Provider value={{
            searchQuery, 
            setSearchQuery, 
            employeeCount,
            setShowAddMadel,
            setShowEditMadel,
            showAddMadel,
            showEditMadel,
            itemToEdit, 
            setItemToEdit,
            setEmployeeCount,
            emplooyees,
            setEmployees
        }}>

            <Main />
            
        </AppContext.Provider>
    );
}

export default App;