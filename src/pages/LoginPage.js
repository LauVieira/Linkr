import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext'
import {media} from '../components/SmallerComponents';

export default function LoginPage () {
    const { setUserData } = useContext(UserContext);
    const [ clicked, setClicked ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ pictureUrl, setPictureUrl ] = useState('');
    const [ signUp, setSignUp ] = useState(false);
    const [ username, setUsername ] = useState('');
    let history = useHistory();

    function validateForm () {
        return signUp 
            ? email.length * password.length * username.length * pictureUrl.length
            : email.length * password.length;
    }

    function submitForm(event) {
        event.preventDefault();
        if (clicked) return;

        if (validateForm()) {
            setClicked(true);
            processRequest();
        }
        else {
            alert('Please, fill in all required entry fields');
        }
    }

    function processRequest () {
        signUp
            ? sendRequest({email, password, username, pictureUrl},'up')
            : sendRequest({email, password},'in'); 
    }

    function sendRequest (userObj,goal) {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/sign_${goal}`,userObj);
        request.then( response => {loginSucceeded(response)} ).catch( error => {loginFailed(error)} );
    }

    function loginFailed (error) {
        setClicked(false);
        const errorCode = error.response.status;
        errorCode === 400 && alert('This e-mail address is already registered');           
        errorCode === 401 && alert('E-mail/password incorrect');
    }

    function loginSucceeded (response) {
        setUserData({...response.data});
        history.push('/timeline');
    }
  
    return (
        <MainContainer>

            <LogoContainer>
                <div>
                    <h1>linkr</h1>
                    <h2>save, share and discover<br/>the best links on the web</h2>
                </div>
            </LogoContainer>

            <LoginContainer>

                <form onSubmit={(event) => submitForm(event)}>
                    <input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}/>

                    {signUp && <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username}/>}
                    {signUp && <input type="text" placeholder="picture url" onChange={(e) => setPictureUrl(e.target.value)} value={pictureUrl}/>}

                    { signUp
                        ? <button type="submit">Sign Up</button> 
                        : <button type="submit">Log in</button>  
                    }                 
                </form>

                { signUp
                    ?  <p onClick={() => setSignUp(!signUp)}>Switch back to log in</p>
                    :  <p onClick={() => setSignUp(!signUp)}>First time? Create an account!</p> 
                } 

            </LoginContainer>

        </MainContainer>
    );
}

const MainContainer = styled.section`
    color: #FFF;
    display: flex;
    height: 100vh;
    width: 100wv;

    ${media} {
        flex-direction: column;
    }
`;

const LogoContainer = styled.div`
    background: #151515;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    width: 60%;

    h1 {
        font: 700 100px 'Passion One', cursive;
    }

    h2 {
        font: 700 40px 'Oswald', sans-serif;
    }

    ${media} {
        height: 180px;
        padding: 10px 0 20px 0;
        text-align: center;
        width: 100%;

        h1 {
            font-size: 70px;
        }
        
        h2 {
            font-size: 20px;
            margin-top: -10px;
        }
    }
`;

const LoginContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 40%;

    p {
        font: 400 20px 'Lato', sans-serif;
        margin-top: 20px;
        text-decoration: underline;
    }

    form {
        align-items: center;
        display: flex;
        font: 700 27px 'Oswald', sans-serif;
        flex-direction: column;
        justify-content:center;
        width: 400px;

        button {
            background: #1877F2;
            border-radius: 6px;
            padding: 10px;
            text-align: center;
            width: 100%;
        }

        input {
            background: #FFF;
            border-radius: 6px;
            color: #9F9F9F;
            margin-bottom: 10px;
            padding: 10px 15px;
            width: 100%;
        }

        ${media} {
            font-size: 22px;
            width: 300px;

            button {
                padding: 7px;
            }

            input {
                padding: 7px 15px;
            }
        }
    }

    ${media} {
        justify-content: flex-start;
        margin-top: 20px;
        width: 100%;
    }
`;