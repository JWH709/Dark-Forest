import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useAuth } from "react-oidc-context";

class User {
    sub: string;
    username: string;
    email: string;
    status: boolean;

    constructor(sub: string, username: string, email: string, status: boolean) {
        this.sub = sub;
        this.username = username;
        this.email = email;
        this.status = status;
    }
}

const Home = () => {
    const auth = useAuth()

    React.useEffect(()=>{
        if(auth.user?.profile) {
            const user = new User(auth.user.profile.sub, auth.user.profile.preferred_username, auth.user.profile.email, auth.user.profile.email_verified)
            console.log(user)
            const endPoint = 'http://localhost:8080/user-info'
            axios.post(endPoint, user).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }
    },[auth])

    const navigate = useNavigate()
    const findJoinableLobby = React.useCallback(()=> {
        const callLobbies = async () => {
            const endPoint = 'http://localhost:8080/get-lobby'
            try {
                const res = await axios.get(endPoint)
                navigate('./lobby', { state: { lobby: res.data }})  
            } catch(error) {
                console.log(error)
            }
        }

        callLobbies()
    },[navigate])

    return (
        <>
            <Stack spacing={2} direction="row">
                <Button variant="contained" onClick={()=>{
                    findJoinableLobby()  
                }}>Play</Button>
            </Stack>
        </>
    )
}

export default Home