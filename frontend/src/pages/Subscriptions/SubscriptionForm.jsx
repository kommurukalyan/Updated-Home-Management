import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import './Subscriptions.css'
import { convertdate } from '../../utils/date';


const initialFValues = {

    Id: 0,
    AccountName: '',
    PlanPeriod: '',
    StartDate:new Date(),
    EndDate: '',
    UserId:''
}

const AccountNames=[
    {id:1,title:'Netflix'},
    {id:2,title:'Disney Hotstar'},
    {id:3,title:'Amazon Prime'},
    {id:4,title:'Spotify'},
    {id:5,title:'Ahaa'}]

const PlanPeriods=[
    {id:1,title:'3 months'},
    {id:2,title:'6 months'},
    {id:3,title:'9 months'},
    {id:4,title:'12 months'}
]
export default function SubscriptionForm(props) {
    const { addOrEdit, recordForEdit } = props

    let userId=localStorage.getItem('Id')
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('AccountName' in fieldValues)
            temp.AccountName = fieldValues.AccountName ? "" : "This field is required."
        if ('PlanPeriod' in fieldValues)
            temp.PlanPeriod = fieldValues.PlanPeriod ? "" : "Plan Period is Required."
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
        
       let date=convertdate(values.StartDate,values.PlanPeriod)
       values.StartDate=date.StartDate
       values.EndDate=date.EndDate
        const formdata = new FormData();
		formdata.append("Id", values.Id);
		formdata.append("AccountName", values.AccountName);
    formdata.append("PlanPeriod", values.PlanPeriod);
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
                        name="AccountName"
                        label="Account Name"
                        value={values.AccountName}
                        onChange={handleInputChange}
                        options={AccountNames}
                        error={errors.AccountName}
                    />
                <Controls.Select
                        name="PlanPeriod"
                        label="Plan Period"
                        value={values.PlanPeriod}
                        onChange={handleInputChange}
                        options={PlanPeriods}
                        error={errors.PlanPeriod}
                    />
                    <Controls.DatePicker
                        name="StartDate"
                        label="StartDate"
                        value={values.StartDate}
                        onChange={handleInputChange}
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
