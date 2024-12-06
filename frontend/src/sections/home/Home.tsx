import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useAuth } from "react-oidc-context";

const Home = () => {
    const auth = useAuth()
    console.log(auth)
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