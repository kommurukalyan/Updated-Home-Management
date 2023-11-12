import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import './Documents.css'
import { convertdate } from '../../utils/date';


const initialFValues = {

    Id: 0,
    DocumentName: '',
    RenewalPeriod: '',
    StartDate:new Date(),
    EndDate: '',
    UserId:''
}

const DocumentNames=[
    {id:1,title:'Aadhar'},
    {id:2,title:'Passport'},
    {id:3,title:'Electricity Bill'},
    {id:4,title:'Water Bill'},
    {id:5,title:'Power Bill'}]

const RenewalPeriods=[
    {id:1,title:'3 months'},
    {id:2,title:'6 months'},
    {id:3,title:'9 months'},
    {id:4,title:'12 months'}
]
export default function DocumentForm(props) {
    const { addOrEdit, recordForEdit } = props

    let userId=localStorage.getItem('Id')
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('DocumentName' in fieldValues)
            temp.DocumentName = fieldValues.DocumentName ? "" : "This field is required."
        if ('RenewalPeriod' in fieldValues)
            temp.RenewalPeriod = fieldValues.RenewalPeriod ? "" : "Renewal Period is Required."
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
        
       let date=convertdate(values.StartDate,values.RenewalPeriod)
       values.StartDate=date.StartDate
       values.EndDate=date.EndDate
        const formdata = new FormData();
		formdata.append("Id", values.Id);
		formdata.append("DocumentName", values.DocumentName);
    formdata.append("RenewalPeriod", values.RenewalPeriod);
		formdata.append("StartDate", values.StartDate);
		formdata.append("EndDate", values.EndDate);
		formdata.append("UserId", userId);
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
        <Form onSubmit={handleSubmit} >
            <Grid container>
                <Grid item xs={6}>
                <Controls.Select
                        name="DocumentName"
                        label="Document Name"
                        value={values.DocumentName}
                        onChange={handleInputChange}
                        options={DocumentNames}
                        error={errors.AccountName}
                    />
                     <Controls.DatePicker
                        name="StartDate"
                        label="StartDate"
                        value={values.StartDate}
                        onChange={handleInputChange}
                    />
                <Controls.Select
                        name="RenewalPeriod"
                        label="Renewal Period"
                        value={values.RenewalPeriod}
                        onChange={handleInputChange}
                        options={RenewalPeriods}
                        error={errors.RenewalPeriod}
                    />
                   
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
