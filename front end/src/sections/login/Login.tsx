import React from 'react'
import '../../styles/login.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Navigate } from "react-router-dom";

const Login = () => {

    const attemptLogin = () => {
        window.location.href = 'http://localhost:8080/login'
    }

    const [notWorkin, setNotWorkin] = React.useState(false)

    return (
        <>
            <div className='login-wrapper'>
                <Box
                    component="form"
                    sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                    noValidate
                    autoComplete="off"
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Stack direction="row" spacing={2}>
                        <Button variant="outlined" onClick={attemptLogin}>Login</Button>
                        <Button variant="outlined" onClick={()=>{setNotWorkin(true)}}>Not Workin</Button>
                    </Stack>
                </Box>
            </div>    
            {notWorkin &&
                <Navigate to="/home"/>
            }  
        </>
    )
}

export default Login