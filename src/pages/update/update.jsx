import React, { useContext } from 'react';
import "../../Sass/index.scss"
import { FiMenu } from "react-icons/fi"
import "../../Sass/index.scss"
import { useState,useEffect } from "react"
import { logout } from "../../context/slices/authSlice"
import { IconButton } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from '../../components/DarckMore/Context';
import { IoSunnyOutline, IoSunnySharp } from 'react-icons/io5';
import { useGetAddQuery } from '../../context/api/adminApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Update = ({menu,setMenu,setRender}) => {
  const {data:dataAll}  = useGetAddQuery()
  let name = dataAll?.message.fullname
  const {theme, setTheme} =useContext(Context)
  const navigate = useNavigate()
  let isLogin = useSelector(state => state.auth.token)
    const { id } = useParams()
    const [data,setData] = useState(null)


    useEffect(() =>{
        axios
        .get(`https://obidjon.pythonanywhere.com/api/v1/update/${id}/`,{
            headers: {
                'Authorization': `Bearer ${isLogin} `
              } 
        })
       .then(res => {
        setData(res.data)
      
      
       })
       .catch(err => console.log(err))

    })
    let dispatch = useDispatch()
    const [anchorEl, setAnchorEl] =useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };



    const handelSubmit = (e) =>{
      e.preventDefault()
      axios
      .post(`https://obidjon.pythonanywhere.com/api/v1/update-status/${id}/inactive/`, {},{
        headers: {
            'Authorization': `Bearer ${isLogin} `,
            'content-type': "application/json"
          } 
      })
       .then(res => {
        toast.success('Update status successfully')
        console.log(res);
      
       

        })
        .catch(err => {
          toast.error('Failed to update status')
          console.log(err);
        })
        
    }
    return (
        <>
          <header className={`header ${theme ? "light" : ""}`}>
                <nav className={`header__navbar ${!menu ? "header__navbar-show" : ""}`}>
                    <div className="header__right-box">
                        <div className="header__right-box__part">
                                <FiMenu onClick={() => setMenu(p => !p)} className={`header__menu-btn ${!menu ? "show" : ""}`} />
                         <h1>Updates</h1>
                        </div>
                        <div className="header__left-box">

                        {
                                  theme ? 
                                  <IoSunnyOutline  className='svg' onClick={() =>setTheme(!theme)} />
                                  :
                                  <IoSunnySharp className='svg' onClick={() =>setTheme(!theme)} />
                                }
                           
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Typography sx={{ minWidth: 100 }}>{name}</Typography>
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
          <Avatar /> My account
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



            <div className={`editS ${theme ? "light" : ""}`}>
        <div className="edit_form">
          <form action=""  onSubmit={handelSubmit}  >
            <div className="company">
              <div className="companiy__">
                <label htmlFor="">Company</label> <br />
                <input type="text"   value={data?.company}/>
             
              </div>
              <div className="companiy__">
                <label htmlFor="">Truck</label>
                <input type="text"   value={data?.update_vehicle}/>
              </div>
            </div>
            <div className="companiy__">
              <label htmlFor="">Driver</label><br />
              <input type="text"  value={data?.update_driver} />
            </div>
            <div className="tex">
              <label htmlFor="">Issue</label> <br />
              <textarea  id="" cols="30" rows="10"  value={data?.update_issue}></textarea>
            </div>
            <div className="btn_rowss">
                <p>{data?.created_at}</p>
                <div className="btns">
                <div className="btn_alls">
                <button type='submit' disabled={!data?.status}  onClick={() =>  navigate(-1)} >Done</button>  
                 
               
              </div>
              <div className="btn_allsw">
                <button type='button' onClick={() =>  navigate(-1)}>Close</button>
              </div>
                </div>
               
            </div>
          </form>
        </div>
      </div>
        
        </>
    );
}

export default Update;
