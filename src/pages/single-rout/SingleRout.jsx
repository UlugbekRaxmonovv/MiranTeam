import React, { useContext, useEffect, useState } from 'react';
import { FiMenu } from "react-icons/fi";
import "../../Sass/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../context/slices/authSlice";
import { IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useGetCompanyCategoryQuery } from '../../context/api/customerApi';
import { useFormInputValue } from '../../components/hook/useFormInputValue';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Context } from '../../components/DarckMore/Context';
import { IoSunnyOutline, IoSunnySharp } from 'react-icons/io5';
import { useGetAddQuery } from '../../context/api/adminApi';
import { useNavigate } from 'react-router-dom';

const initialState = {
  update_vehicle: '',
  update_driver: '',
  update_issue: '',
  company_name: ''
};
// let tokin ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxNzUwMjM2LCJpYXQiOjE3MjE2NjM4MzYsImp0aSI6ImE5N2EzY2EwNzYyMjRjMDE5NmRiMzYzMDVlNmU2ODA1IiwidXNlcl9pZCI6MX0.M1IfbVyK8l3EohpCoYcVLpnervMJ6PZCluYNUmR2z1A"
const SingleRout = ({ menu, setMenu }) => {
  const {data:dataAll}  = useGetAddQuery()
  let name = dataAll?.message.fullname
  const {theme, setTheme} =useContext(Context)
  let isLogin = useSelector(state => state.auth.token)
  let dispatch = useDispatch();
  const { data: companyCategories } = useGetCompanyCategoryQuery();
  const { setState, state, handleChange } = useFormInputValue(initialState);
  const [relout,setRelout] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = (e) => {
    e.preventDefault();
    const product = {
      update_vehicle: state.update_vehicle,
      update_driver: state.update_driver,
      update_issue: state.update_issue,
      company_name: +state.company_name,
    };
    console.log(product);

    axios
      .post('https://miransub.miranteam.uz/api/v1/update/', product, {
        headers: {
          'Authorization': `Bearer ${isLogin} `
        } 
      })
      .then((response) => {
        console.log(response);
        toast.success('Vehicle updated successfully');
        setRelout(p => !p);  
        navigate('/admin/warehouse')
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to update vehicle');
      });

    setState(initialState);
    setRelout(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header className={`header ${theme ? "light" : ""}`}>
        <nav className={`header__navbar ${!menu ? "header__navbar-show" : ""}`}>
          <div className="header__right-box">
            <div className="header__right-box__part">
              <FiMenu onClick={() => setMenu(p => !p)} className={`header__menu-btn ${!menu ? "show" : ""}`} />
              <h1>Updates Post</h1>
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
          <form action="" onSubmit={handelSubmit} >
            <div className="company">
              <div className="companiy__">
                <label htmlFor="">Company</label> <br />
                <select id="" value={state.company_name} onChange={handleChange} name='company_name'>
                  <option value="">Companies</option>
                  {
                    companyCategories?.map((item, index) => {
                      return <option key={index} value={item.id}>{item.company_name}</option>
                    })
                  }
                </select>
              </div>
              <div className="companiy__">
                <label htmlFor="">Truck</label>
                <input required type="text" value={state.update_vehicle} onChange={handleChange} name='update_vehicle' />
              </div>
            </div>
            <div className="companiy__">
              <label htmlFor="">Driver</label><br />
              <input type="text" required value={state.update_driver} onChange={handleChange} name='update_driver' />
            </div>
            <div className="tex">
              <label htmlFor="">Issue</label> <br />
              <textarea required value={state.update_issue} onChange={handleChange} name='update_issue' id="" cols="30" rows="10"></textarea>
            </div>
            <div className="btn_rows">
              <div className="btn_alls">
                <button type='submit'>Done</button>
              </div>
              <div className="btn_allsw">
                <button type='button' onClick={() => navigate(-1)}>Close</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SingleRout;
