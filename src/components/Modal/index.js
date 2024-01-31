import { useContext, useState, useEffect } from 'react';

import { AppContext } from '../../context/AppContext';

import EmployeeApi from '../../apis/EmployeeApi'

import { SKILL_LEVEL }  from '../../constraint/index'

import { IoAddOutline } from "react-icons/io5";

import { MdCancel } from "react-icons/md";

import { MdAddCircle } from "react-icons/md";

import { RiDeleteBin6Line } from "react-icons/ri";

import './Styles.css'

const Modal = () => {

    const defaultFormDataValues = () =>{
        return {
            first_name: "",
            last_name: "",
            contact_number:"",
            email_address: "",
            date_of_birth:"",
            street_address:"",
            city:"",
            postal_code:"",
            country:""
        }
    }

    const  defaultDynamicInputs = () => {
        return [{
            skill_name : "",
            years_of_experience:"",
            seniority_rating:""
        }]
    }

    const { showAddMadel, showEditMadel, setShowAddMadel, setShowEditMadel, itemToEdit, setItemToEdit, setEmployees, setEmployeeCount } = useContext(AppContext)

    const [formData, setFormData] = useState(defaultFormDataValues);

    const [dynamicInputs, setDynamicInputs] = useState(defaultDynamicInputs)

    const [employeToBeUpdaed, setEmployeToBeUpdaed] = useState(null)

    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (itemToEdit != null) {
            getEmployee(itemToEdit)
        }
        
    }, [itemToEdit]);

    const getEmployee = async () => {

        const data = await EmployeeApi.get(itemToEdit)
        setEmployeToBeUpdaed(data)
        mapToFormData(data)
  
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSaveEmployee = async (event) => {
        event.preventDefault();

        const body = mapToRequestBody()

        const response = await createEmployee(body)
    };

    const handleUpdateEmployee = async (event) => {

        event.preventDefault();

        const body = mapToRequestBody()

        const response = await updateEmployee(body)
    };

    const handleCancel = () => {

        setShowAddMadel(false)
        setShowEditMadel(false)
        setEmployeToBeUpdaed(null);
        setDynamicInputs(defaultDynamicInputs)
        setFormData(defaultFormDataValues)
        setItemToEdit(null)
        setErrors([])

    }

    const handleAddSkill = () => {

        setDynamicInputs([...dynamicInputs, {
            skill_name : "",
            years_of_experience:"",
            seniority_rating:""
        }])

    }

    const handleDynamicInputsChange = (event, index) => {

        const {name,value} = event.target
        
        const changedData = [...dynamicInputs]
        changedData[index][name]=value

        setDynamicInputs(changedData)

    }

    const handleRemoveDynamicInputsChange = (index) => {

        const deleteValue = [...dynamicInputs]
        deleteValue.splice(index,1)
        setDynamicInputs(deleteValue)

    }

    const createEmployee = async (body) => {

        const content = await EmployeeApi.create(body)

        if (content.errors !== undefined) {
            setErrors(content.errors)
            return
        }

        handleCancel()

        await getAllEmployes()
        
        return content;
    }

    const updateEmployee = async (body) => {
        
        const content = await EmployeeApi.update(itemToEdit, body)

        if (content.errors !== undefined) {
            setErrors(content.errors)
            return
        }

        await getAllEmployes()

        handleCancel()
        
        return content;
    }

    const getAllEmployes = async () => {

        const employees = await EmployeeApi.getAll();

        setEmployees(employees)
        setEmployeeCount(employees.length)
    }

    const mapToFormData = (response) => {

        formData.first_name = response.first_name
        formData.last_name = response.last_name
        formData.contact_number = response.contact_number
        formData.email_address = response.email_address
        formData.date_of_birth = response.date_of_birth
        formData.street_address = response.address_information.street_address
        formData.city = response.address_information.city
        formData.postal_code = response.address_information.postal_code
        formData.country = response.address_information.country
        setDynamicInputs(response.skills)
    }

    const mapToRequestBody = () => {

        return {
            first_name : formData.first_name,
            last_name: formData.last_name,
            contact_number : formData.contact_number,
            email_address : formData.email_address,
            date_of_birth : formData.date_of_birth,
            address_information: {
                street_address:formData.street_address,
                city:formData.city,
                postal_code:formData.postal_code,
                country:formData.country
            },
            skills:dynamicInputs
        }

    }

    return (
        <>
            { ( showAddMadel === true || showEditMadel === true) &&
                <div className='model-container'>
                    {
                        errors.length > 0  && <div className='error'>All Feilds Are Required</div>
                    }

                    <div>
                        { employeToBeUpdaed != null ? 
                            <p className='model-title'>Edit Employee</p> : 
                            <p className='model-title'>New Employee</p> 
                        }

                        <p className='model-basic-info-title'>Basic Info</p>

                       <div className='model-name'>
                            <div className='model-first-name'>
                                <label htmlFor="first_name">First Name</label>
                                <input required className='input' type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange}/>
                            </div>
                            
                            <div className='model-last-name'>
                                <label htmlFor="last_name">Last Name</label>
                                <input className='input' type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange}/>
                            </div>
                            
                        </div> 
                        
                        <div className='model-contact-number'>
                            <label htmlFor="contact_number">Contact Number</label>
                            <input className='input larger-input' type="text" id="contact_number" name="contact_number" value={formData.contact_number} onChange={handleChange}/>
                        </div>

                        <div className='model-email-address'>
                            <label htmlFor="email_address">Email Address</label>
                            <input className='input larger-input' type="text" id="email_address" name="email_address" value={formData.email_address} onChange={handleChange}/>
                        </div>
                       
                        <div className='model-date-of-birth'>
                            <label htmlFor="date_of_birth">Date Of Birth</label>
                            <input className='input' type="date" id="date_of_birth" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange}/>
                        </div>
                        
                        <p className='model-basic-info-title'>Address Info</p>

                        <div className='model-street-address'>
                            <label htmlFor="street_address">Street Address</label>
                            <input className='input larger-input' type="text" id="street_address" name="street_address" value={formData.street_address} onChange={handleChange}/>
                        </div>

                        <div className='model-surb'>

                            <div className='model-city'>
                                <label htmlFor="city">City</label>
                                <input className='input' type="text" id="city" name="city" value={formData.city} onChange={handleChange}/>
                            </div>

                            <div className='model-postal-code'>
                                <label htmlFor="postal_code">Postal Code</label>
                                <input className='input' type="text" id="postal_code" name="postal_code" value={formData.postal_code} onChange={handleChange}/>

                            </div>

                            <div className='model-country'>
                                <label htmlFor="country">Country</label>
                                <input className='input' type="text" id="country" name="country" value={formData.country} onChange={handleChange}/>  
                            </div>
                            
                        </div>
                       
                        <p className='model-basic-info-title'>Skills</p>
                        {
                            dynamicInputs.map((val,i) =>
                                <div className='skill-item' key={i}>
                                    <div className='skill'>
                                        <label htmlFor="skill">Skill</label>
                                        <input className='input' type="text" id={"skill_name"} name="skill_name" value={val.skill_name} onChange={(e) => handleDynamicInputsChange(e,i)}/>
                                    </div>
                                   
                                    <div className='years-of-experience'>
                                        <label htmlFor="years_of_experience">Yrs Exp</label>
                                        <input className='input' type="text" id="years_of_experience" name="years_of_experience" value={val.years_of_experience} onChange={(e) => handleDynamicInputsChange(e,i)}/>
                                    </div>
                                    
                                    <div className='seniority-rating'>
                                        <label htmlFor="seniority_rating">Seniority Rating</label>
                                        <select className='input select-input' id="seniority_rating" name="seniority_rating" value={val.seniority_rating} onChange={(e) => handleDynamicInputsChange(e,i)}>
                                            { SKILL_LEVEL.map((element, index) => <option value={element} key={index}>{element}</option>) }
                                        </select>
                                    </div>
                                   
                                    <div onClick={() => handleRemoveDynamicInputsChange(i)} className='delete-button'>
                                        <RiDeleteBin6Line />
                                    </div>
                                    
                                </div>

                            )
                        }


                        {
                            dynamicInputs.length > 2 ?
                            null :
                            <div className='modal-add-skill-button' onClick={handleAddSkill}> <IoAddOutline /> Add Kill</div>
                        }
                       
                       <div className='model-action-buttons'>

                            <div className='primary-button' onClick={handleCancel}><span><MdCancel  /></span>Cancel</div>

                            { employeToBeUpdaed != null ? 
                                
                                <div className='primary-button' onClick={handleUpdateEmployee}><span><MdAddCircle /></span> Save Changes to Employee</div> :
                                <div className='primary-button' onClick={handleSaveEmployee}><span><MdAddCircle /></span> Save and Add Employee</div>
                            }
                            
                        </div>
                    </div>
                </div>
            }
        </>
       
    )
}

export default Modal