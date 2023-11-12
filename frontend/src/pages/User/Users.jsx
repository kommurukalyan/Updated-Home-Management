import React, { useEffect, useState } from 'react'
import PageHeader from "../../components/PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../components/useTable";
import * as employeeService from "../../services/employeeService";
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import './Users.css'
import UserForm from './UserForm';
import * as userService from '../../services/userService'
import profileavatar from '../../assets/profile avatar.jpg'


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
    { id: 'Image', label: 'User Photo',disableSorting: true },
    { id: 'Name', label: 'User Name' },
    { id: 'Email', label: 'User Email' },
    { id: 'Age', label: 'User Age' },
    { id: 'Phone', label: 'User Phone' },
    { id: 'Actions', label: 'Actions', disableSorting: true }
]

export default function Users() {
    let adminId=localStorage.getItem('AdminId')
    
    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records1, setRecords1] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

 const getAllUsers=async()=>{
    await userService.getAllUsers(adminId)
    .then(data=>{
        setRecords1(data[0])
        })
 }
 useEffect(()=>{
    userService.getAllUsers(adminId).then(data=>setRecords1(data[0]))
 },[])

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records1, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.Name.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (user, resetForm) => {
        let userId=user.get('Id')
        if (userId== 0){
            userService.createUser(user).then(res=>res)
        }
        else{
            userService.updateUser(user).then(res=>res)
        }
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        getAllUsers();
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
        userService.deleteUser(id).then(res=>res)
        getAllUsers()
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
                title="Users"
                subTitle="Add new user"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            </div>
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Controls.Input
                        label="Search Users"
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
                                    <TableCell>
                                    {item.Image!=null?
            <img src={`http://localhost:8801/images/${item.Image}`} alt="" id='user_imagenew'/>:
            <img src={profileavatar} alt="" id='user_imagenew'/>
          }
                                    </TableCell>
                                    <TableCell>{item.Name}</TableCell>
                                    <TableCell>{item.Email}</TableCell>
                                    <TableCell>{item.Age}</TableCell>
                                    <TableCell>{item.Phone}</TableCell>
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
                title="User Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserForm
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
