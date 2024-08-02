import { useGetAddQuery } from '../../context/api/adminApi';
import React, { useContext, useState } from 'react';
import { FiMenu } from "react-icons/fi";
import "../../Sass/index.scss";
import { logout } from "../../context/slices/authSlice";
import { IconButton, Avatar, Box, Menu, MenuItem, ListItemIcon, Divider, Typography, Tooltip } from "@mui/material";
import Logout from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { PatternFormat } from 'react-number-format';
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useFormInputValue } from '../../components/hook/useFormInputValue';
import { IoSunnyOutline, IoSunnySharp } from 'react-icons/io5';
import { Context } from '../../components/DarckMore/Context';
import { useNavigate } from 'react-router-dom';


const initialState = {
  username: "",
  firstname: "",
  surname: "",
  phone: "",
  password: "",
};
const Create = ({ menu, setMenu }) => {
  const [role,setRole] = useState(0)
  console.log(role);
  const navigate = useNavigate();
  const {theme, setTheme} =useContext(Context)
  const isLogin = useSelector(state => state.auth.token);
  // console.log(isLogin);
  const dispatch = useDispatch();
  const { data } = useGetAddQuery();
  const [eye, setEye] = useState(false);
  const [eye1, setEye1] = useState(false);
  const name = data?.message.fullname;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {state,setState,handleChange} = useFormInputValue(initialState)



  const handelSubmit =  (e) => {
    e.preventDefault();
    const admins = {
      username: state.username,
      firstname: state.firstname,
      surname: state.surname,
      phone: state.phone,
      password: state.password,
      role: +role
    };
    console.log(admins);
    setState(initialState)
    axios
    .post('https://obidjon.pythonanywhere.com/api/v1/api/accounts/', admins, {
      headers: {
          'Authorization': `Bearer ${isLogin}`,
       
      }
      })
      .then(res => {
        console.log(res);
        toast.success('User added successfully!');
        navigate(-1)
      })
      .catch(err => {
        console.log(err);
        toast.error('Something went wrong!');
      });
       

  };

  return (
    <div>
      <header className={`header ${theme ? "light" : ""}`}>
        <nav className={`header__navbar ${!menu ? "header__navbar-show" : ""}`}>
          <div className="header__right-box">
            <div className="header__right-box__part">
              <FiMenu onClick={() => setMenu(p => !p)} className={`header__menu-btn ${!menu ? "show" : ""}`} />
              <h1>Admins</h1>
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
      <div className= {`l ${theme ? "light" : ""}`}>
        <div className="admins_w">
          <form action="" onSubmit={handelSubmit}>
          <div className="admins_w_s">
                  <p>Personal Info</p>
                  <div className="admins_w_s_a">
                    <div className="admins_w_s_b_w">
                      <button type="submit">Save</button>
                    </div>
                    <div className="admins_w_s_b_w_s">
                      <button type="button"  onClick={() =>navigate('/admin/vendor')}>Close</button>
                    </div>
                  </div>
                </div>
                <div className="w">
                  <div className="input">
                    <label htmlFor="username" >Username</label> <br />
                    <input 
                    required
                      autoComplete='off'
                      type="text" 
                      name="username" 
                      value={state.username}
                      onChange={handleChange}
                      
                      placeholder="Enter your username"
                    />
                  
                  </div>
                  <div className="input_w">
                    <div className="input_r">
                      <label htmlFor="firstname">FirstName</label> <br />
                      <input 
                       autoComplete='off'
                        type="text" 
                        required
                        name="firstname" 
                        placeholder="Enter your first name"
                        value={state.firstname}
                        onChange={handleChange}
                        
                      />
                      
                    </div>
                    <div className="input_r">
                      <label htmlFor="surname">LastName</label> <br />
                      <input 
                           autoComplete='off'
                        type="text" 
                        required
                        name="surname" 
                        value={state.surname}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                      />
                    
                    </div>
                    <div className="input_r">
                      <label htmlFor="phone">Phone</label> <br />
                      <input type="tel"   value={state.phone} onChange={handleChange} name="phone"  />
                      {/* <PatternFormat  value={state.phone} onChange={handleChange} name="phone"     autoComplete='off' format="+998(##) ### ## ##" allowEmptyFormatting mask="_" /> */}
                    </div>
                    <div className="input_r">
                      <label htmlFor="role">Role</label> <br />
                      <select name="" id="" onChange={(e) => setRole(e.target.value)}>
                      <option value="0">Admin</option>
                      <option value="1">Manager</option>
                      </select>
                     
                    </div>
                     <div className="inp">
                      <label htmlFor="password">Password</label> <br />
                     <div className="input_rs">
                      <input 
                        required
                          autoComplete='off'
                        type={eye ? "text" : "password"}
                        name="password" 
                        // value={state.password}
                        // onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      <div className="int_a" onClick={() => setEye(prev => !prev)}>
                  {eye ? <VscEyeClosed className="eye" /> : <VscEye className="eye" />}
                </div>
                     </div>
                     
                    </div>
                    <div className="inp">
                    <label htmlFor="confirmPassword">Confirm Password</label> <br />
                     <div className="input_rs">
                      <input 
                          autoComplete='off'
                        type={eye1 ? "text" : "password"}
                        name="password" 
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      <div className="int_a" onClick={() => setEye1(prev => !prev)}>
                  {eye1 ? <VscEyeClosed className="eye" /> : <VscEye className="eye" />}
                </div>
                     </div>
                   
                    </div>
                  </div>
                </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
