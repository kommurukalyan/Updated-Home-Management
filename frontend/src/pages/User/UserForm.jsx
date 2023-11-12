import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import * as employeeService from "../../services/employeeService";
import './Users.css'
import profileavatar from '../../assets/profile avatar.jpg'


const initialFValues = {

    Id: 0,
    Name: '',
    Email: '',
    Age:'',
   Phone: '',
    Image:'',
    Password:'',
    AdminId:''
}

export default function UserForm(props) {
    const { addOrEdit, recordForEdit } = props

    let adminId=localStorage.getItem('AdminId')
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
    } = useForm(initialFValues, true, validate);

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
            addOrEdit(formdata, resetForm);
        }
    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

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
                    {/* <Controls.Input
                    type='password'
                        label="Password"
                        name="Password"
                        value={values?.Password}
                        onChange={handleInputChange}
                    /> */}
                    
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
					<input type="file" className="form-control" id="inputGroupFile02" name="inputGroupFile02"
					onChange={(e)=>values.Image=e.target.files[0]}/>
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
