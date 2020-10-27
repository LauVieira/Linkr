import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  Link
} from "react-router-dom";

import axios from 'axios';
import styled from 'styled-components';

export default function LoginPage () {
    console.log('entrou');
    return (
        <MainContainer>
            <LogoContainer>
                <h1>linkr</h1>
                <h2>save, share and discover<br/>the best links on the web</h2>
            </LogoContainer>
            <LoginContainer>
                <StyledForm>
                    <input type="email" placeholder="e-mail" />
                    <input type="password" placeholder="password" />
                    <button type="submit">Log in</button>
                </StyledForm>
                <p>First time? Create an account!</p>
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
`;

const StyledForm = styled.form`
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


`;