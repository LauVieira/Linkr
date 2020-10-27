import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext'

export default function LoginPage () {
    const {setUserData} = useContext(UserContext);
    const [signUp,setSignUp] = useState(false);
    const [clicked,setClicked] = useState(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [username,setUsername] = useState('');
    const [pictureUrl,setPictureUrl] = useState('');
    

    function switchSignUp () {
        setSignUp(!signUp);
    }


    function validateForm () {
        return signUp 
            ? email.length * password.length * username.length * pictureUrl.length
            : email.length * password.length;
    }


    function sendRequest (userObj,goal) {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/si9gn_${goal}`,userObj);
        request.then( response => {loginSucceeded(response)} ).catch( response => {loginFailed(response)} );
    }


    function processRequest () {
        if (signUp) {
            sendRequest({email, password, username, pictureUrl},'up');
        }
        else {
            sendRequest({email, password},'in');
        }
    }

    //http://www.criarmeme.com.br/i/gato-comunista.jpg
    function loginFailed (response) {
        setClicked(false);
        console.log(response.status);
    }

    function loginSucceeded (response) {
        setUserData({...response});
        console.log(response);
        let history = useHistory();
        history.push('/timeline');
        //push history
    }
  

    function submitForm(event) {
        event.preventDefault();
        if (clicked) return;

        if (validateForm()) {
            setClicked(true);
            processRequest();
        }
        else {
            alert('Por favor, preencha todos os campos');
        }
    }

    return (
        <MainContainer>
            <LogoContainer>
                <h1>linkr</h1>
                <h2>save, share and discover<br/>the best links on the web</h2>
            </LogoContainer>
            <LoginContainer>
                <form onSubmit={(event) => submitForm(event)}>
                    <input type="email" placeholder="e-mail" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password}/>

                    { signUp && <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username}/>}
                    { signUp && <input type="text" placeholder="picture url" onChange={(e) => setPictureUrl(e.target.value)} value={pictureUrl}/>}

                    {   signUp
                        ? <button type="submit">Sign Up</button> 
                        : <button type="submit">Log in</button>  
                    }                  
                </form>
                {   signUp
                    ?  <p onClick={switchSignUp}>Switch back to log in</p>
                    :  <p onClick={switchSignUp}>First time? Create an account!</p> 
                } 
               
            </LoginContainer>
        </MainContainer>
    );
}


const MainContainer = styled.section`
    color: #FFF;
    display: flex;
    height: 100vh;
    width: 100%;
`;

const LogoContainer = styled.div`
    background: #151515;
    height: 100%;
    padding: 300px 0 0 150px;
    width: 60%;

    h1 {
        font: 700 100px 'Passion One', cursive;
    }

    h2 {
        font: 700 40px 'Oswald', sans-serif;
    }
`;


const LoginContainer = styled.div`
    align-items: center;
    background: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 40%;

    p{
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
    }
`;

const StyledForm = styled.form`
   


`;