import React, { useEffect, useState } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import './Profile.css'
import profileavatar from '../../assets/profile avatar.jpg'
import * as userService from '../../services/userService'
import { useLocation } from 'react-router-dom';



const initialFValues = {

    Id: '',
    Name: '',
    Email: '',
    Age:'',
   Phone: '',
    Image:'',
    Password:'',
    AdminId:''
}

export default function Profile() {
    let userdata=localStorage.getItem('userdata')
    let userdetails=JSON.parse(userdata)
    const [recordForEdit ] = useState(userdetails)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    
    
    let adminId=localStorage.getItem('AdminId')
    let userId=localStorage.getItem('Id')
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('Name' in fieldValues)
            temp.Name = fieldValues.Name ? "" : "This field is required."
        if ('Email' in fieldValues)
            temp.Email = (/$^|.+@.+..+/).test(fieldValues.Email) ? "" : "Email is not valid."
        if ('Phone' in fieldValues)
            temp.Phone = fieldValues.Phone.length > 9 ? "" : "Minimum 10 numbers required."
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, false, validate);

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [])
   


    const handleSubmit = e => {
        e.preventDefault()
        const formdata = new FormData();
		formdata.append("Id", values.Id);
		formdata.append("Name", values.Name);
    formdata.append("Age", values.Age);
		formdata.append("Phone", values.Phone);
		formdata.append("Email", values.Email);
		formdata.append("Password", values.Password);
		formdata.append("Image", values.Image);
		formdata.append("AdminId", adminId);
        if (validate()) {
            userService.updateUser(formdata).then(res=>{
                userService.getUserById(userId).then(res=>{
                    res
                    setValues({
                        ...values,
                        values:res[0]})
                   

                })
                
            })  
            setNotify({
                isOpen: true,
                message: 'Updated Successfully',
                type: 'success'
            })      
        }
    }

   

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="Name"
                        label="Name"
                        value={values?.Name}
                        onChange={handleInputChange}
                        error={errors.Name}
                    />
                    <Controls.Input
                        label="Email"
                        name="Email"
                        value={values?.Email}
                        onChange={handleInputChange}
                        error={errors.Email}
                    />
                    <Controls.Input
                        label="Age"
                        name="Age"
                        value={values?.Age}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Phone"
                        name="Phone"
                        value={values?.Phone}
                        onChange={handleInputChange}
                        error={errors.Phone}
                    />
                    <Controls.Input
                    type='password'
                        label="Password"
                        name="Password"
                        value={values?.Password}
                        onChange={handleInputChange}
                    />
                    
                </Grid>
                <Grid item xs={6}>
                <div>

                <figure className='avatar1 avatar-profile1'>
                {
                    values.Image!=""?
                    <img className="rounded-circle1 img-fluid1" src={`http://localhost:8801/images/${values?.Image}`} alt='' />:
                    <img className="rounded-circle1 img-fluid1" src={profileavatar} alt='' />

                }
                </figure>
                <br />
					<input type="file"  id="inputGroupFile02" name="Image"
				     onChange={(e)=>values.Image=e.target.files[0]}/>
                     {/* <Controls.Input
                    type='file'
                        label="Image"
                        name="Image"
                        value={values?.Image}
                        onChange={handleInputChange}
                    /> */}
          </div>
          <br />
                        <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}
