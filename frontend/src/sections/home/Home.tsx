import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useAuth } from "react-oidc-context";

class User {
    sub: string | undefined;
    username: string | undefined;;
    email: string | undefined;
    status: boolean | undefined;

    constructor(sub: string | undefined, username: string | undefined, email: string | undefined, status: boolean | undefined) {
        this.sub = sub;
        this.username = username;
        this.email = email;
        this.status = status;
    }
}

interface UserGameInProgress {
    status: boolean;
    gameId: number | null;
}

const Home = () => {
    const auth = useAuth()
    const [isUserInGame, setIsUserInGame] = React.useState<UserGameInProgress>({status: false, gameId: null})

    // Create or update user Cognito info:
    React.useEffect(()=>{
        if(auth.user?.profile) {
            const user = new User(auth.user.profile.sub, auth.user.profile.preferred_username, auth.user.profile.email, auth.user.profile.email_verified)
            const endPoint = 'http://localhost:8080/user-info'
            axios.post(endPoint, user).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        } //ToDo: catch for this
    },[auth])

    // Is a user in a game already?:
    React.useEffect(()=>{
        if(auth.user?.profile.sub) {
            const userId = auth.user?.profile.sub
            const endPoint = 'http://localhost:8080/check-in-game'
            axios.post(endPoint, userId).then(res => {
                setIsUserInGame(res.data)
            }).catch(error => {
                console.log(error)
            })
        }
    },[auth.user?.profile.sub])

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
            {!isUserInGame.status &&
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{
                        findJoinableLobby()  
                    }}>Find Game</Button>
                </Stack>
            }
            {isUserInGame.status &&
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{
                        findJoinableLobby()  
                    }}>Re-Join Game</Button>
                </Stack>
            }
        </>
    )
}

export default Home