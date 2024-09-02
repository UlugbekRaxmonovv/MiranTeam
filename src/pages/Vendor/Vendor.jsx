import "../../Sass/index.scss"
import { FiMenu } from "react-icons/fi"
import "../../Sass/index.scss"
import { HiOutlineSearch } from "react-icons/hi"
import { IoCloseCircleOutline, IoSunnyOutline, IoSunnySharp } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { Link, NavLink } from "react-router-dom";
import "../../Sass/index.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { memo, useContext, useEffect, useState } from "react"
import { logout } from "../../context/slices/authSlice"
import { IconButton, Pagination } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import { AiOutlineEdit } from "react-icons/ai";
import { useGetAddQuery } from "../../context/api/adminApi"
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Context } from "../../components/DarckMore/Context"
import axios from "axios"
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData(0,  6.0, 5, 24, 4.0),
  
  ];
const Vendor = ({menu,setMenu,render}) => {
  const {theme, setTheme} =useContext(Context)
  const isLogin = useSelector((state) => state.auth.token);
  let dispatch = useDispatch()
  const [selectedStatus, setStatusChange] = useState("active");
  const {data:role}  = useGetAddQuery()
  console.log(role?.message?.role);
   console.log(selectedStatus);
    const [ search,setSearch]  =useState("")
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      axios
        .get(`https://miransub.miranteam.uz/api/v1/accounts/?status=${selectedStatus}`, {
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

    const [anchorEl, setAnchorEl] =useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [itemsPerPage, setItemsPerPage] = useState(Number(localStorage.getItem("pages")) || 10);
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
     setPage(value);
   };
   const paginatedData = data?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    const {data:products}  = useGetAddQuery()
   let name = products?.message.fullname
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
      

            <div className={`updatess ${theme ? "light" : ""}`}>
            <div className={`update ${theme ? "light" : ""}`}>
          <div className="post">
          <div className="update_all">
            <label htmlFor="" style={{opacity:'0'}}>Search</label> <br />
                <input type="text"  placeholder="Search ... "  value={search}  onChange={(e) => setSearch(e.target.value)}/>
             </div>
             <div className="update_all">
                <label htmlFor="">Filter by status</label><br />
                <select value={selectedStatus} onChange={(e) => setStatusChange(e.target.value)}>
                <option value="active"> Active</option>
              <option value="all">All</option>
              <option value="inactive">Inactive</option>
            </select>
             </div>
          </div>
          <div className="btn_row">
              <Link to={'/admin/create'}>
              <button disabled={role?.message?.role !==1}> { role?.message?.role === 1 ? " Add user"  : " Add user"}</button>
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
                <div className="update_alls">
                <select value={selectedStatus} onChange={(e) => setStatusChange(e.target.value)}>
                <option value="active"> Active</option>
              <option value="all">All</option>
              <option value="inactive">Inactive</option>
            </select>
             </div>
             </div>
            
           </div>
          </div>
          <div className="btn_row">
              <Link to={'/admin/create'}>
              <button>Add user</button>
              </Link>
              
             </div>
           </div>

           {
            loading ? 
          (
            <TableContainer component={Paper} className={`TableContainer ${!menu ? "table" : ""}`}>
            <Table  sx={{ minWidth: 650 }} aria-label="simple table">
           <TableHead>
          <TableRow>
          <TableCell className="TableCell">#</TableCell>
          <TableCell align="left" className="TableCell">Company</TableCell>
            <TableCell align="left" className="TableCell">	Joined At</TableCell>
            <TableCell align="left" className="TableCell">		Author</TableCell>
            <TableCell align="left" className="TableCell">Status</TableCell>
            <TableCell align="left" className="TableCell">Actions</TableCell>
          </TableRow>
        </TableHead>
              {
        Array(itemsPerPage).fill("").map((_, inx)=>
        <TableBody  key={inx} sx={{cursor:'pointer'}} >
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell className="TableCell" component="th" scope="row">
              <Stack spacing={1}>     <Skeleton variant="rectangular" className="TableCells" width={10} height={15} sx={{borderRadius:5}} /></Stack>
              </TableCell>
              <TableCell className="TableCell" align="left" sx={{cursor:'pointer'}}>
              <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells" width={80} height={15}  sx={{borderRadius:5}} /></Stack>
              </TableCell>
              <TableCell className="TableCell" align="left"> 
              <Stack spacing={1}>    <Skeleton variant="rectangular"  className="TableCells" width={80} height={25} sx={{borderRadius:2}}  /></Stack>
              </TableCell>
              <TableCell align="left" className="TableCell"> 
              <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells"  width={200} height={15}  sx={{borderRadius:5}} /></Stack>
              </TableCell>
              <TableCell align="left" className="TableCell"> 
              <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells" width={100} height={15} sx={{borderRadius:5}}  /></Stack>
              </TableCell>
            
              <TableCell align="left" className="TableCell"> 
              <Stack spacing={1}>    <Skeleton variant="rectangular" className="TableCells"  width={20} height={20} sx={{borderRadius:1}}  /></Stack>
              </TableCell>
            </TableRow>
        </TableBody>
    )
    
    }
       </Table>
    </TableContainer>
          )
    :
  (
    <div className={`tar ${theme ? "light" : ""}`}>
    <TableContainer component={Paper} className={`TableContainer ${!menu ? "table" : ""}`}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow  className='width'>
    <TableCell  className="TableCell">#</TableCell>
    <TableCell  className="TableCell" align="left">FullName</TableCell>
      <TableCell  className="TableCell" align="left">Role</TableCell>
      <TableCell  className="TableCell" align="left">Joined At</TableCell>
      <TableCell  className="TableCell" align="left">Phone </TableCell>
      <TableCell  className="TableCell" align="center">Actions </TableCell>
    </TableRow>
  </TableHead>
  <TableBody >
    {paginatedData?.filter((user) =>{
       return user.phone?.toLowerCase().includes(search.toLowerCase())
       || user.fullname?.toLowerCase().includes(search.toLowerCase())
          })?.map((row,inx) => (
  
            <TableRow
        key={inx.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
      >
        <TableCell  className="TableCell" component="th" scope="row">
          {inx + 1}
        </TableCell>
           
    <TableCell  className="TableCell" align="left" sx={{cursor:'pointer'}}> {row.fullname}  </TableCell> 
   
   <TableCell   className="TableCell" align="left">{row.role ? <button style={{color:'white',padding:'4px 12px',backgroundColor:'lightgreen',borderRadius:'4px'}}>Manager</button>: <button style={{color:'white',padding:'4px 19px',backgroundColor:'gray',borderRadius:'4px'}}>Admin</button>} </TableCell>
        <TableCell   className="TableCell"align="left">{row.created_at }</TableCell>
        <TableCell  className="TableCell" align="left">{row.phone}</TableCell>
        <TableCell  className="TableCell" align="center" style={{cursor:'pointer'}}> <Link to={`/admin/editAdmins/${row.id}/`}><AiOutlineEdit/></Link></TableCell>
      </TableRow>

    ))}
  </TableBody>
</Table>
</TableContainer>
</div>
  )

           }
           <div className={`pagination ${theme ? "light" : ""}`}>
           <Box sx={{display:'flex',justifyContent:'end', p:'25px'}}>
              <div className='paj'>
              <Pagination  count={Math.ceil(data?.length / itemsPerPage)}  variant="outlined" page={page}  onChange={handlePageChange}  />
              </div>
             </Box>
           </div>
           </div>
          
         
        </>
    )
}

export default memo(Vendor)