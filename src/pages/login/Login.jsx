import { memo, useEffect, useState } from 'react';
import { TextField, IconButton, InputAdornment, Button } from '@mui/material';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import "../../Sass/index.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../context/api/adminApi';
import { useDispatch } from 'react-redux';
import { setToken } from '../../context/slices/authSlice';

const initialState = {
    username: "",
    password: ""
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const [userLogin, {data, isSuccess, isLoading,  }] = useSignInMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    useEffect(() => {
        if (isSuccess) {
            navigate("/admin/customer")
            dispatch(setToken(data?.access))
            console.log("ok");
        }
    }, [isSuccess])
    const handleLogin = (e) => {
        e.preventDefault()
        userLogin(formData)
    };

    return (
        <section className='login'>
            <div className='login__wrapper'>
                <h1 className="login__title">MIRAN <span>TEAM</span></h1>
                <form className='login__form' onSubmit={handleLogin}>
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        placeholder='string3'
                        sx={{outline: 'none'}}
                        margin="normal"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder='stringstring'
                        value={formData.password}
                        onChange={handleChange}
                        sx={{outline: 'none'}}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2,backgroundColor:"black"}}
                        disabled={isLoading}
                        type='submit'
                    >
                      Sign In
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default memo(Login);
