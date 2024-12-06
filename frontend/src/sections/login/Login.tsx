import '../../styles/login.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useAuth } from "react-oidc-context";

const Login = () => {
    const auth = useAuth();

    //ToDo: Create Logout Route (leave unused for now)
    const signOutRedirect = () => {
        const clientId = import.meta.env.VITE_AWS_CLIENT_ID
        const logoutUri = "http://localhost:8080/logout"
        const cognitoDomain = import.meta.env.VITE_AWS_LOGIN_DOMAIN
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    }
    //ToDo: Formal error notice:
    if(auth.error) {
        console.log('Error: ', auth.error.message)
    }
    if (auth.isAuthenticated) {
        console.log(auth.user)
    }

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
                        <Button variant="outlined" onClick={() => auth.signinRedirect()}>Test: AWS</Button>
                    </Stack>
                </Box>
            </div>
        </>
    )
}

export default Login