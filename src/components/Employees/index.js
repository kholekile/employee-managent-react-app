import {useState, useEffect, useContext } from 'react';

import Modal from '../Modal'

import EmployeeCard from '../EmployeeCard'

import { AppContext } from '../../context/AppContext'

import EmployeeApi from '../../apis/EmployeeApi'

import { NoEmployeesIcon } from '../../assests/index'

import './Styles.css'

const Employees = () => {

    const { searchQuery, setEmployeeCount, emplooyees, setEmployees } = useContext(AppContext)

    const getEmployees = async ( searchQuery ) => {

        const results = await EmployeeApi.getAll()
        
        if(searchQuery != ""){
            
            filteredEmployees(results)
        }
        else {

            setEmployees(results)

            setEmployeeCount(results.length)
        }
        
    };

    const filteredEmployees = (results) => {

        const result = results.filter((emplooyee) => emplooyee.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        emplooyee.last_name.toLowerCase().includes(searchQuery.toLowerCase())||  
        emplooyee.email_address.toLowerCase().includes(searchQuery.toLowerCase()))

        if (result.length > 0) {

            setEmployees(result)

            setEmployeeCount(result.length)
        }
        else {

            setEmployees(result)

            setEmployeeCount(result.length)
        }

    }

    useEffect(() => {
        getEmployees(searchQuery)
    }, [searchQuery]);

  return (
    <div className='employee-container'>
        <Modal/>

        {
            emplooyees && emplooyees.length ?
            emplooyees.map((emplooyee, index) => (
                <div className='employee-list-item' key={emplooyee.id}>
                    <EmployeeCard issueIndex={index + 1} emplooyee={emplooyee} />
                </div>  
            )) : 
            <div className='no-content-container'>
                <img src={NoEmployeesIcon} />
                <p>There is nothing here</p>
                <p>
                    Create a new employee by clicking the <strong>New Employee </strong>
                    button to get started
                </p>
            </div>
        }

        
    </div>
  )
}

export default Employees