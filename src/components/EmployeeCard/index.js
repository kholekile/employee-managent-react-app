import { useContext } from 'react';

import { AppContext } from '../../context/AppContext';

import EmployeeApi from '../../apis/EmployeeApi'

import { MdAutoDelete } from "react-icons/md";

import { FaUserEdit } from "react-icons/fa";

import './Styles.css'

const EmployeeCard = ({ emplooyee, issueIndex }) => {

    const { setItemToEdit, setShowEditMadel, setEmployees, setEmployeeCount } = useContext(AppContext)

    const handleEdit = (event, employeeId) => {
        event.preventDefault()

        setItemToEdit(employeeId)
        setShowEditMadel(true)
    }

    const handleDelete = async(event, employeeId) => {
        event.preventDefault()
        await deleteEmployee(employeeId)
        await getAllEmployes()

    }

    const getAllEmployes = async () => {

        const employees = await EmployeeApi.getAll();

        setEmployees(employees)

        setEmployeeCount(employees.length)
    }

    const deleteEmployee = async (employeeId) => {
        await EmployeeApi.delete(employeeId)
    }

    return (
        <div className='employee-card-container'>

            <div className='employee-card-counter'>
               {issueIndex}
            </div>

            <div className='employee-card-detail'>
                <p>{emplooyee.first_name}</p>
            </div>

            <div className='employee-card-detail'>
                <p>{emplooyee.last_name}</p>
            </div>

            <div className='employee-card-detail'>
                <p>{emplooyee.contact_number}</p>
            </div>
            
            <div className='employee-card-detail'>
                <p>{emplooyee.email_address}</p>
            </div>

            <div className='employee-card-button-group'>
                <div onClick={(e) =>handleEdit(e,emplooyee.id)} className='button-secondary'>
                    <FaUserEdit />
                </div>
                
                <div onClick={(e) =>handleDelete(e,emplooyee.id)} className='button-danger'>
                    <MdAutoDelete />
                </div>
            </div>
            
        </div>
        
    )
}

export default EmployeeCard