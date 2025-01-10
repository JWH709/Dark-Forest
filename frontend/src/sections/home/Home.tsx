/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios"
import { useAuth } from "react-oidc-context";
import { useNavigate } from 'react-router-dom';


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
    console.log(auth)
    const navigate = useNavigate()
    const [isUserInGame, setIsUserInGame] = React.useState<UserGameInProgress>({status: false, gameId: null})

    // Create or update user Cognito info:
    React.useEffect(()=>{
        if(auth.user?.profile) {
            const user = new User(auth.user.profile.sub, auth.user.profile.preferred_username, auth.user.profile.email, auth.user.profile.email_verified)
            const endPoint = `${import.meta.env.VITE_URL}/user-info`
            axios.post(endPoint, user).then(res => {
                console.log(res)
            }).catch(error => {
                console.log(error)
            })
        }
    },[auth])

    React.useEffect(() => {
        if (auth.user?.profile.sub != undefined) {
            const userId = auth.user?.profile.sub
            const endPoint = `${import.meta.env.VITE_URL}/check-in-game`;
    
            axios
                .post(endPoint, { userId })
                .then((res) => {
                    console.log(res.data)
                    setIsUserInGame(res.data);
                })
                .catch((error) => {
                    console.log('Error in check-in-game:', error);
                });
        }
    }, [auth]);

    // Find a Game:
    const joinLobby = React.useCallback(()=> {
        if(auth.user?.profile.sub != undefined)
            {
            const user = {id: auth.user?.profile.sub, username: auth.user?.profile.preferred_username}
            const endPoint = `${import.meta.env.VITE_URL}/join-lobby`
            axios.post(endPoint, {user}).then(res =>{
                setIsUserInGame({status: true, gameId: res.data})
                navigate(`/lobby/${res.data}`)
            }).catch(error => {
                console.log(error)
            })
        }
    },[auth])

    return (
        <>
            {!isUserInGame.status &&
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{
                        joinLobby()  
                    }}>Find Game</Button>
                </Stack>
            }
            {isUserInGame.status &&
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={()=>{
                        navigate(`/lobby/${isUserInGame.gameId}`)
                    }}>Re-Join Game</Button>
                </Stack>
            }
        </>
    )
}

export default Home