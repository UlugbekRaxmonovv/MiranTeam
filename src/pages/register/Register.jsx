import React, { useContext, useEffect } from 'react';
import { FiMenu } from "react-icons/fi"
import "../../Sass/index.scss"
import { useDispatch, useSelector } from "react-redux"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetAddQuery, useGetProfileQuery } from "../../context/api/adminApi";
import { memo, useState } from "react"
import { logout } from "../../context/slices/authSlice"
import { IconButton, Modal, Pagination } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import rasm from '../../assets/imgs/img.jpg'
import rasm1 from '../../assets/imgs/rasm1.jpg'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Modul from '../../components/Modul/Modul';
import { useFormInputValue } from '../../components/hook/useFormInputValue';
import { useCreateProductMutation } from '../../context/api/productApi';
import { toast } from 'react-toastify';
import { IoSunnyOutline, IoSunnySharp } from 'react-icons/io5';
import { Context } from '../../components/DarckMore/Context';
// import { useGetAddQuery } from '../../context/api/adminApi';
import  moon  from '../../assets/imgs/moon.png' 
import moon1 from '../../assets/imgs/moon1.png'
import axios from 'axios';
const initialState={
  company_name:""
}
const Register = ({menu,setMenu,render,setRender}) => {
  const {theme, setTheme} =useContext(Context)
  const [ companyAll,setCompany] = useState(false);
  
  const {setState,state,handleChange} = useFormInputValue(initialState)
  const {data:role}  = useGetAddQuery()
  

document.body.style.overflow =  companyAll ? "hidden" : "auto"
let dispatch = useDispatch()
const [ search,setSearch]  =useState("")
const [selectedStatus, setStatusChange] = useState("active");
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
let isLogin = useSelector(state => state.auth.token)

useEffect(() => {
  setLoading(true);
  axios
    .get(`https://miransub.miranteam.uz/api/v1/company/?status=${selectedStatus}`, {
      headers: {
        Authorization: `Bearer ${isLogin}`,
      },
    })
    .then((res) => {
      setData(res.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error:", error);
      setLoading(false);
    });
}, [selectedStatus, render, isLogin]);

const [itemsPerPage, setItemsPerPage] = useState(Number(localStorage.getItem("pages")) || 7);
const [page, setPage] = useState(1);
const handlePageChange = (event, value) => {
    setPage(value);
  };
  const paginatedData = data?.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  
  
  
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const {data:all}  = useGetAddQuery()
  let name = all?.message.fullname

  const handelComponyAll = (id) =>{
    axios
    .patch(`https://miransub.miranteam.uz/api/v1/company-status/${id}/status/`,{},{
        headers: { 
          'Authorization': `Bearer ${isLogin}`,
           'content-type': "application/json"

          
        } 
    })
    .then(res => {
        console.log(res)
        toast.success('Company Deactivated Successfully')
    
        
       
     })
     .catch(err => {
        console.log(err)
        toast.error('Company Deactivation Failed')
     })
}


const handelCompany =(e) =>{
  e.preventDefault();
  let company ={
  company_name: state.company_name
}
axios
 .post(`https://miransub.miranteam.uz/api/v1/company/`, company, {
    headers: {
      Authorization: `Bearer ${isLogin}`,
    },
  })
  .then((res) => {
    setCompany(true)
    setState(initialState)
    setRender(p => !p)
    toast.success('User created')
  })
  .catch((error) => {
     console.error("Error:", error);
   })



}

    return (
       <>
          <header className={`header ${theme ? "light" : ""}`}>
                <nav className={`header__navbar ${!menu ? "header__navbar-show" : ""}`}>
                    <div className="header__right-box">
                        <div className="header__right-box__part">
                                <FiMenu onClick={() => setMenu(p => !p)} className={`header__menu-btn ${!menu ? "show" : ""}`} />
                       <h1>Company</h1>
                        </div>
                        <div className="header__left-box">

                        {
                                  theme ? 
                                  <img style={{width:30, height:30, cursor:'pointer'}} onClick={() =>setTheme(!theme)} src={moon1} alt="moon" />
                                  :
                                  <img style={{width:20, height:20, objectFit:'cover', cursor:'pointer'}} onClick={() =>setTheme(!theme)} src={moon} alt="moon" />
                                  
                                }
                           
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100,whiteSpace: "nowrap" }}>{name}</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> {name}
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Avatar /><Link to={'/admin/vendor'}>     My account </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => dispatch(logout())}>
          <ListItemIcon >
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

                            
                        </div>
                    </div>
                </nav>
            </header>

            <div className={`updatess ${theme ? "light" : ""}`}>
            <div className={`update ${theme ? "light" : ""}`}>
          <div className="post">
          <div className="update_all">
            <label htmlFor="" style={{opacity:'0'}}>Search</label> <br /> 
                <input type="text" value={search}  onChange={(e) => setSearch(e.target.value)} placeholder="Search ... "/>
             </div>
             <div className="update_all">
                <label htmlFor="">Filter by status</label><br />
                <select value={selectedStatus} onChange={(e) => setStatusChange(e.target.value)}>
                <option value="active">Active</option>
              <option value="all">All</option>
              <option value="deactive">Deactive</option>
            </select>
             </div>
             
          </div>
             <div className="btn_row">
              <Link>
              <button onClick={() => setCompany(true)} disabled={role?.message?.role !==1}> { role?.message?.role === 1 ? "Add company"  : " Add company"}</button>
              </Link>
              
             </div>
           </div>
           <div className={`updates ${theme ? "light" : ""}`}>
          <div className="post">
          <div className="update_alls">
                <input type="text" value={search}  onChange={(e) => setSearch(e.target.value)} placeholder="Search ... "/>
             </div>
           <div className="hammasi">
           <div className="update_allss">
                <label htmlFor="">Filter by status</label><br />
                <select value={selectedStatus} onChange={(e) => setStatusChange(e.target.value)}>
                <option value="active">Active</option>
              <option value="all">All</option>
              <option value="deactive">Deactive</option>
            </select>
             </div>
           </div>
          </div>
          <div className="btn_row">
          <Link>
    <button
      onClick={() => setCompany(true)}
      disabled={role?.message?.role !== 1} 
      style={{ cursor: role?.message?.role === 1 ? 'pointer' : 'not-allowed' }}
    >
      {role?.message?.role === 1 ? "Add company" : "Add company"}
    </button>
  </Link>
</div>

           </div>

      
           {
            loading ? 
         (   <div className={`tar ${theme ? "light" : ""}`}>
         <TableContainer component={Paper} className={`TableContainer ${!menu ? "tables" : ""}`}>
         <Table  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
       <TableRow>
       <TableCell className="TableCell">#</TableCell>
       <TableCell align="left" className="TableCell">Company</TableCell>
         <TableCell align="left" className="TableCell">	Joined At</TableCell>
         <TableCell align="center" className="TableCell">		Author</TableCell>
         <TableCell align="center" className="TableCell">Status</TableCell>
         <TableCell align="left" className="TableCell">Actions</TableCell>
       </TableRow>
     </TableHead>
           {
     Array(itemsPerPage).fill("").map((_, inx)=>
     <TableBody  key={inx} sx={{cursor:'pointer'}} >
         <TableRow
           sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
         >
           <TableCell component="th" scope="row" className="TableCell">
           <Stack spacing={1}>     <Skeleton className="TableCells" variant="rectangular" width={10} height={15} sx={{borderRadius:5}} /></Stack>
           </TableCell>
           <TableCell align="left" sx={{cursor:'pointer'}} className="TableCell">
           <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells" width={80} height={15}  sx={{borderRadius:5}} /></Stack>
           </TableCell>
           <TableCell align="left" className="TableCell"> 
           <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells"  width={200} height={15}  sx={{borderRadius:5}} /></Stack>
           </TableCell>
           <TableCell align="left" className="TableCell"> 
           <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells" width={100} height={15} sx={{borderRadius:5}}  /></Stack>
           </TableCell>
           <TableCell align="left" className="TableCell"> 
           <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells"  width={60} height={30} sx={{borderRadius:2}}  /></Stack>
           </TableCell>
           <TableCell align="left" className="TableCell"> 
           <Stack spacing={1} >    <Skeleton variant="rectangular" className="TableCells"   width={30} height={30} sx={{borderRadius:5}}  /></Stack>
           </TableCell>
         </TableRow>
     </TableBody>
 )
 
 }
    </Table>
 </TableContainer>
 </div>)
    :

(    <div className={`tar ${theme ? "light" : ""}`}>
<TableContainer component={Paper} className={`TableContainer ${!menu ? "tables" : ""}`}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
 <TableHead>
   <TableRow className='width'>
   <TableCell className="TableCell">#</TableCell>
   <TableCell className="TableCell" align="left">Company</TableCell>
     <TableCell className="TableCell" align="left">Joined At</TableCell>
     <TableCell className="TableCell" align="left" >Author</TableCell>
     <TableCell className="TableCell" align="center">Status </TableCell>
     <TableCell className="TableCell" align="left">Actions </TableCell>
   </TableRow>
 </TableHead>
 <TableBody sx={{cursor:'pointer'}} >
   {
   paginatedData?.filter((user) =>{
return user.company_name?.toLowerCase().includes(search.toLowerCase())
|| user.created_at.toLowerCase().includes(search.toLowerCase())
|| user.company_author.toLowerCase().includes(search.toLowerCase())


 })?.map((row,inx) => (
     <TableRow
       key={row.id}
       
       sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
     >
       <TableCell className="TableCell" component="th" scope="row">
         {inx + 1}
       </TableCell>
       <TableCell className="TableCell" align="left" sx={{cursor:'pointer'}}>{row.company_name}</TableCell>
       <TableCell className="TableCell" align="left">{row.created_at}</TableCell>
       <TableCell className="TableCell" align="left">{row?.company_author}</TableCell>
       <TableCell className="TableCell" align="center">{row.company_status ? <button style={{color:'white',padding:'4px 12px',backgroundColor:'lightgreen',borderRadius:'4px'}}>Active</button>: <button style={{color:'white',padding:'4px 12px',backgroundColor:'#E03D56',borderRadius:'4px'}}>Inactive</button>}</TableCell>
       <TableCell className="TableCell" align="left">
  {row.company_status ? (
    <img
      onClick={role?.message?.role === 1 ? () => handelComponyAll(row.id) : undefined}
      width={40}
      height={40}
      style={{ borderRadius: '20px', cursor: role?.message?.role === 1 ? 'pointer' : 'not-allowed' }}
      src={rasm}
      alt="Company Status Image"
    />
  ) : (
    <img
      onClick={role?.message?.role === 1 ? () => handelComponyAll(row.id) : undefined}
      width={25}
      height={25}
      style={{ borderRadius: '20px', marginLeft: '8px', cursor: role?.message?.role === 1 ? 'pointer' : 'not-allowed' }}
      src={rasm1}
      alt="Company Status Image"
    />
  )}
</TableCell>

     </TableRow>
   ))}
 </TableBody>
</Table>
</TableContainer>
</div>)
           }
             <div className={`pagination ${theme ? "light" : ""}`}>
           <Box sx={{display:'flex',justifyContent:'end', p:'25px'}}>
              <div className='paj'>
              <Pagination  count={Math.ceil(data?.length / itemsPerPage)}  variant="outlined" page={page}  onChange={handlePageChange}  />
              </div>
             </Box>
             </div>
            
</div>
       
{
            companyAll ? 
            <Modul btn1={setCompany} width='500px' height='10px'>
                  <div className="CompanyName">
<form action=""   onSubmit={handelCompany}>
<div className="CompanyName_All">
  <p>Company Name</p>
  <input type="text" value={state.company_name}  onChange={handleChange} name='company_name' />
  <div className="Cancel">
  <div className="Cancel_r">
     <button onClick={() =>setCompany(null)}>Cancel</button>
    </div>
    <div className="Cancel_r_s">
     <button>{loading ? 'loading' : 'Save'}</button>
    </div>
  </div>
</div>
</form>
                  </div>

              </Modul>
              :
              <> </>
           }
       </>
    );
    
}

export default Register;
