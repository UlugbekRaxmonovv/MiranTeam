import { FiMenu } from "react-icons/fi"
import "../../Sass/index.scss"
import { HiOutlineSearch } from "react-icons/hi"
import { IoCloseCircleOutline, IoSunnyOutline, IoSunnySharp } from "react-icons/io5"
import { memo, useContext, useState } from "react"
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux"
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
import { useGetAddQuery } from "../../context/api/adminApi"  
import { Context } from "../DarckMore/Context"
const Header = ({ menu, setMenu }) => {
 
  const {theme, setTheme} =useContext(Context)
    const [searchValue, setSearchValue] = useState("")
    let dispatch = useDispatch()
    const {data}  = useGetAddQuery()
   let name = data?.message.fullname
   console.log(name);



    const [anchorEl, setAnchorEl] =useState(null);
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
                          
                        </div>
                        <div className="header__left-box" >

                        {
                                  theme ? 
                                  <IoSunnyOutline  className='svg' onClick={() =>setTheme(!theme)} />
                                  :
                                  <IoSunnySharp className='svg' onClick={() =>setTheme(!theme)} />
                                }
                           
                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                              <Typography className="logo_w" sx={{ minWidth: 100,  }}>{name}</Typography>
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
        </>
    )
}
Header.propTypes = {
    menu: PropTypes.bool.isRequired,
    setMenu: PropTypes.func.isRequired,
};

export default memo(Header)