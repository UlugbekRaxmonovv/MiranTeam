import React, { useContext, useEffect, useState } from 'react';
import "../../Sass/index.scss";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { logout } from "../../context/slices/authSlice";
import { IconButton } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { IoSunnyOutline, IoSunnySharp } from 'react-icons/io5';
import { Context } from '../../components/DarckMore/Context';
import { useGetAddQuery } from '../../context/api/adminApi';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const EditAdmins = ({ menu, setMenu }) => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const {data:dataAll}  = useGetAddQuery()
  let name = dataAll?.message.fullname
  const { theme, setTheme } = useContext(Context);
  const isLogin = useSelector(state => state.auth.token);
  // const [role,setRole] = useState(0)
  const [data, setData] = useState({
    username: '',
    firstname: '',
    surname: '',
    phone: '',
    role: +'',
    password: '',
  });

  const {data:roles}  = useGetAddQuery()
  console.log(roles?.message?.role);
  console.log(data);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://miransub.miranteam.uz/api/v1/accounts/${id}/`, {
        headers: {
          'Authorization': `Bearer ${isLogin}`
        }
      })
      .then(res => {
        setData(res?.data);
      })
      .catch(err => console.log(err));
  }, [id, isLogin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`https://miransub.miranteam.uz/api/v1/accounts/${id}/`, data,{
        headers: {
          'Authorization': `Bearer ${isLogin}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        toast.success('Admin successfully updated data')
      })
      .catch(err => {
        console.log(err)
        toast.error('Error updating admin data')
      });

  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = (data) => {
    axios
      .patch(`https://miransub.miranteam.uz/api/v1/user-status/${id}/status/`, {},{
         headers: {
           'Authorization': `Bearer ${isLogin}`
         }
      })
      .then(res => {
         console.log('Account status updated:', res.data);
         toast.success('Admin account status updated')
         navigate(-1)
         handleClose()
       })
       .catch(err => {
         console.log(err)
         toast.error('Error updating admin account status')
       });
  


 
  };


  
  const handChange = (data) => {
    axios
    .patch(`https://miransub.miranteam.uz/api/v1/user-status/${id}/status/`, {},{
       headers: {
         'Authorization': `Bearer ${isLogin}`
       }
    })
    .then(res => {
       console.log('Account status updated:', res.data);
       toast.success('Admin account status updated')
       navigate(-1)
       handleClose()
     })
     .catch(err => {
       console.log(err)
       toast.error('Error updating admin account status')
     });

  


 
  };
  return (
    <>
      <header className={`header ${theme ? "light" : ""}`}>
        <nav className={`header__navbar ${!menu ? "header__navbar-show" : ""}`}>
          <div className="header__right-box">
            <div className="header__right-box__part">
              <FiMenu onClick={() => setMenu(p => !p)} className={`header__menu-btn ${!menu ? "show" : ""}`} />
              <h1>Admins</h1>
            </div>
            <div className="header__left-box">
              {theme ? 
                <IoSunnyOutline className='svg' onClick={() => setTheme(!theme)} /> 
                : 
                <IoSunnySharp className='svg' onClick={() => setTheme(!theme)} />
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
                  <Avatar />  {name}
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => dispatch(logout())}>
                  <ListItemIcon>
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
      <div className={`_admin ${theme ? "light" : ""}`}>
        <div className="__a">
          <form onSubmit={handleFormSubmit}>
            <div className="_admin_rows">
              <p>Personal Info</p>
              <div className="_admin_r">
                <div className="_admin_btn">
                {
                 roles?.message?.role === 1 
                  ? 
                  data?.is_active ?   <button   type="submit">Save</button>
                  : ""
                 :
                 <button disabled={roles?.message?.role !==1}  type="submit">Save</button>
                
                }
                </div>
                <div className="_admin_btns">
                  {
                      roles?.message?.role === 1 ? 
                       
                        data?.is_active ?
                       <button type="button" onClick={() => handleSubmit(data)} style={{backgroundColor:"red"}}>Inactive</button>
                        :
                        <button type="button"  onClick={() => handChange(data)} style={{backgroundColor:"#1AE222"}}>Active</button>
                       
                     
                     :
                    
                      data?.is_active ?
                     <button type="button" disabled={roles?.message?.role !==1} onClick={() => handleSubmit(data)} style={{backgroundColor:"red"}}>Inactive</button>
                      :
                      <button type="button"  onClick={() => handChange(data)} style={{backgroundColor:"#1AE222"}}>Active</button>
                     
                   

                  }
                 
                
                </div>
                <div className="_admin_btnw">
                  <button type="button" onClick={() =>navigate(-1)}>Close</button>
                </div>
              </div>
            </div>
            <div className="input_s">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={data.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="single_r">
              <div className="single_row">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={data.firstname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="single_row">
                <label htmlFor="surname">Last Name</label>
                <input
                  type="text"
                  name="surname"
                  value={data.surname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="single_row">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={data.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="single_row">
                <label htmlFor="role">Role</label>

                {/* <input
                  type="text"
                  name="role"
                  value={data.role}
                  onChange={handleInputChange}
                /> */}
              
                
              <select name="role" id="" onChange={handleInputChange}>
                      <option value="0">{data.role === 0 ? "Admin" : "Manager"}</option>
                      <option value="1">{data.role === 1 ? "Admin" : "Manager"}</option>
                      </select>
              </div>
               <div className="int">
               <label htmlFor="password">Password</label> <br />
              <div className="single_rows">
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                
                />
                 <div className="int_a" onClick={() => setEye(prev => !prev)}>
                  {eye ? <VscEyeClosed className="eye" /> : <VscEye className="eye" />}
                </div>
              </div> 
               </div>
              <div className="int">
              <label htmlFor="confirmPassword">Confirm Password</label> <br />
              <div className="single_rows">
                <input
                  type={eye1 ? "text" : "password"}
                  name="confirmPassword"
                 
                
                />
                 <div className="int_a" onClick={() => setEye1(prev => !prev)}>
                  {eye1 ? <VscEyeClosed className="eye" /> : <VscEye className="eye" />}
                </div>
              </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default EditAdmins;
