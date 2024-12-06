import '../../styles/login.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useAuth } from "react-oidc-context";

const Login = () => {
    const auth = useAuth();

    const handleLogout = () => {
        const clientId = import.meta.env.VITE_AWS_CLIENT_ID;
        const logoutUri = 'http://localhost:5173/';
        const cognitoDomain = "https://us-east-2pqdtjw0uq.auth.us-east-2.amazoncognito.com";
    
        auth.removeUser();
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
      };

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
                        <Button variant="outlined" onClick={() => auth.signinRedirect()}>Log In</Button>
                        <Button variant="outlined" onClick={() => handleLogout()}>Log Out</Button>
                    </Stack>
                </Box>
            </div>
        </>
    )
}

export default Login