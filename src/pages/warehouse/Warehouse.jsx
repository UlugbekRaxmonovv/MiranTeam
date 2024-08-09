import "../../Sass/index.scss";
import { FiMenu } from "react-icons/fi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { memo, useContext, useEffect, useState } from "react";
import { logout } from "../../context/slices/authSlice";
import { IconButton, Pagination } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Context } from "../../components/DarckMore/Context";
import { IoSunnyOutline, IoSunnySharp } from "react-icons/io5";
import axios from "axios";
import { useGetAddQuery } from "../../context/api/adminApi";

const Warehouse = ({ menu, setMenu, render }) => {
  const { theme, setTheme } = useContext(Context);
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.token);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("active");
  const [itemsPerPage, setItemsPerPage] = useState(Number(localStorage.getItem("pages")) || 10);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://miransub.miranteam.uz/api/v1/update/?status=${selectedStatus}`, {
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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const {data:user}  = useGetAddQuery()
   let name = user?.message.fullname
   console.log(name);
  const paginatedData = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
              <FiMenu onClick={() => setMenu((p) => !p)} className={`header__menu-btn ${!menu ? "show" : ""}`} />
              <h1>Updates</h1>
            </div>
            <div className="header__left-box">
              {theme ? (
                <IoSunnyOutline className="svg" onClick={() => setTheme(!theme)} />
              ) : (
                <IoSunnySharp className="svg" onClick={() => setTheme(!theme)} />
              )}

              <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Typography sx={{ minWidth: 100 }}>{name}</Typography>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
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
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&::before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
      <div className={`update ${theme ? "light" : ""}`}>
        <div className="post">
          <div className="update_alls">
            <label htmlFor="" style={{ opacity: "0" }}>s</label>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ..." />
          </div>
          <div className="update_all">
            <label htmlFor="">Filter by status</label><br />
            <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="all">All</option>
              <option value="deactive">Deactive</option>
            </select>
          </div>
        </div>
        <div className="btn_row">
          <Link to={'/admin/single-rout'}>
            <button>Update post</button>
          </Link>
        </div>
      </div>
      <div className={`updates ${theme ? "light" : ""}`}>
        <div className="post">
          <div className="update_alls">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search ..." />
          </div>
          <div className="hammasi">
            <div className="update_allss">
              <label htmlFor="">Filter by status</label><br />
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="active">Active</option>
                <option value="all">All</option>
                <option value="deactive">Deactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="btn_row">
          <Link to={'/admin/single-rout'}>
            <button>Update post</button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className={`tar ${theme ? "light" : ""}`}>
          <TableContainer component={Paper} className={`TableContainer ${!menu ? "table" : ""}`}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="TableCell">#</TableCell>
                  <TableCell className="TableCell" align="left">Company</TableCell>
                  <TableCell className="TableCell" align="left">Vehicle</TableCell>
                  <TableCell className="TableCell" align="left">Driver</TableCell>
                  <TableCell className="TableCell" align="left">Date</TableCell>
                </TableRow>
              </TableHead>
              {Array(itemsPerPage).fill("").map((_, inx) => (
                <TableBody key={inx} sx={{ cursor: 'pointer' }}>
                  <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row" className="TableCell">
                      <Stack spacing={1}><Skeleton className="TableCells" variant="rectangular" width={10} height={15} sx={{ borderRadius: 5 }} /></Stack>
                    </TableCell>
                    <TableCell align="left" className="TableCell" sx={{ cursor: 'pointer' }}>
                      <Stack spacing={1}><Skeleton className="TableCells" variant="rectangular" width={80} height={15} sx={{ borderRadius: 5 }} /></Stack>
                    </TableCell>
                    <TableCell align="left" className="TableCell">
                      <Stack spacing={1}><Skeleton className="TableCells" variant="rectangular" width={30} height={15} sx={{ borderRadius: 5 }} /></Stack>
                    </TableCell>
                    <TableCell align="left" className="TableCell">
                      <Stack spacing={1}><Skeleton className="TableCells" variant="rectangular" width={50} height={15} sx={{ borderRadius: 5 }} /></Stack>
                    </TableCell>
                    <TableCell align="left" className="TableCell">
                      <Stack spacing={1}><Skeleton className="TableCells" variant="rectangular" width={200} height={15} sx={{ borderRadius: 5 }} /></Stack>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className={`tar ${theme ? "light" : ""}`}>
          <TableContainer component={Paper} className={`TableContainer ${!menu ? "table" : ""}`}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow  className='width'>
                  <TableCell className="TableCell">#</TableCell>
                  <TableCell align="left" className="TableCell">Company</TableCell>
                  <TableCell align="left" className="TableCell">Vehicle</TableCell>
                  <TableCell align="left" className="TableCell">Driver</TableCell>
                  <TableCell align="left" className="TableCell">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ cursor: 'pointer' }}>
                {paginatedData
                  ?.filter((user) =>
                    user.company.toLowerCase().includes(search.toLowerCase()) ||
                    user.update_vehicle.toLowerCase().includes(search.toLowerCase()) ||
                    user.update_driver.toLowerCase().includes(search.toLowerCase())
                  )
                  ?.map((row, inx) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell className="TableCell" component="th" scope="row">
                        {inx + 1}
                      </TableCell>
                      <TableCell className="TableCell" align="left" sx={{ cursor: 'pointer' }}>
                        <Link to={`/admin/update/${row.id}`}>
                          {row.company}
                        </Link>
                      </TableCell>
                      <TableCell className="TableCell" align="left"><Link to={`/admin/update/${row.id}`}>{row.update_vehicle}</Link></TableCell>
                      <TableCell className="TableCell" align="left"><Link to={`/admin/update/${row.id}`}>{row.update_driver}</Link></TableCell>
                      <TableCell className="TableCell" align="left"><Link to={`/admin/update/${row.id}`}>{row.created_at}</Link></TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'end', p: '25px' }} className={`pagination ${theme ? "light" : ""}`}>
        <div className='paj'>
          <Pagination count={Math.ceil(data?.length / itemsPerPage)} variant="outlined" page={page} onChange={handlePageChange} />
        </div>
      </Box>
    </>
  );
};

export default memo(Warehouse);
