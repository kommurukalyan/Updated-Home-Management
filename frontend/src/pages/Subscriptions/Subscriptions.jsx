import React, { useEffect, useState } from 'react'
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import './Subscriptions.css'
import SubscriptionForm from './SubscriptionForm';
import * as subscriptionService from '../../services/subscriptionService'


const useStyles = makeStyles(theme => ({
    pageContent: {
        marginTop:'-20px',
        marginLeft:'-35px',
        margin: theme.spacing(5),
        padding: theme.spacing(2)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))


const headCells = [
    { id: 'AccountName', label: 'Account Name' },
    { id: 'PlanPeriod', label: 'PlanPeriod' },
    { id: 'StartDate', label: 'Start Date' },
    { id: 'EndDate', label: 'EndDate' },
    { id: 'Createdby', label: 'CreatedBy' },
    { id: 'Actions', label: 'Actions', disableSorting: true }
]

export default function Subscriptions() {
    let userId=localStorage.getItem('Id')
    
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

 const getAllUserSubscriptions=async()=>{
    await subscriptionService.getUserSubscriptions(userId)
    .then(data=>{
        setRecords(data[0])
        })
 }
 useEffect(()=>{
 subscriptionService.getUserSubscriptions(userId).then(data=>setRecords(data[0]))
 },[])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.AccountName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (subscription, resetForm) => {
        let subscriptionId=subscription.get('Id')
        if (subscriptionId== 0){
            subscriptionService.createUserSubscription(subscription).then(res=> res)
        }
        else{
            subscriptionService.updateUserSubscription(subscription).then(res=>res)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        getAllUserSubscriptions()
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        subscriptionService.deleteUserSubscription(id).then(res=>res)
        getAllUserSubscriptions()
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
        })
    }

    return (
        <>
        <div className="pageHeader">
            <PageHeader
                title="Subscriptions"
                subTitle="Add new subscription"
                icon={<SubscriptionsIcon fontSize="large" />}
            />
            </div>
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Subscription"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead  className='tableheaders'/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item.Id}>
                                    <TableCell>{item.AccountName}</TableCell>
                                    <TableCell>{item.PlanPeriod}</TableCell>
                                    <TableCell>{item.StartDate}</TableCell>
                                    <TableCell>{item.EndDate}</TableCell>
                                    <TableCell>{item.CreatedBy}</TableCell>
                                    <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary"
                                            onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: () => { onDelete(item.Id) }
                                                })
                                            }}>
                                            <CloseIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                            )
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Subscription Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <SubscriptionForm
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
