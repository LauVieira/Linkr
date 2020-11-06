import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import { media } from '../components/SmallerComponents';

export default function UserInput (props) {
    const { userData, header } = useContext(UserContext);
    const [ clicked, setClicked ] = useState(false);
    const [ userComment, setUserComment ] = useState('');
    const [ userLink, setUserLink ] = useState('');

    function submitComment () {
        event.preventDefault();

        if (userLink.length) {
            setClicked(true);
            sendPost(formatObj());
        }
        else {
            alert(`Sorry, you can't publish without a link`);
        }
    }

    function formatObj () {
        const postObj = userComment.length
            ? {link: userLink, text: userComment}
            : {link: userLink};
        return postObj;
    }

    function sendPost (postObj) {
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts',postObj,header);
        request.then(userPostSucceeded).catch(userPostFailed);
    }
    
    function userPostSucceeded () {
        setUserLink('');
        setUserComment('');
        setClicked(false);
        props.getPostsList();
    }

    function userPostFailed () {
        alert('Sorry, there was an error when publishing your link');
        setClicked(false);
    }

    return (
        <UserInputContainer clicked={clicked}>
            <img src={userData.user.avatar} />

            <form onSubmit={(event) => submitComment(event)}>

                <h2>What do you want to bookmark today?</h2>

                <input type='url' 
                    placeholder='https//...' 
                    onChange={(e) => setUserLink(e.target.value)} 
                    value={userLink} 
                    disabled={clicked}
                />

                <input type='text' 
                    placeholder='Would you like to leave a comment?' 
                    onChange={(e) => setUserComment(e.target.value)} 
                    value={userComment} 
                    disabled={clicked}
                />

                {   clicked
                    ? <button disabled={clicked}>Publishing...</button> 
                    : <button type='submit'>Publish</button>  
                }  

            </form>
        </UserInputContainer>
    );
}

const UserInputContainer = styled.div`
    background: #FFF;
    border-radius: 15px;
    color: #707070;
    display: flex;
    font: 300 16px 'Lato', sans-serif;
    height: 250px;
    margin-bottom: 20px;
    padding: 25px;
    width: 600px;

    img {
        border-radius: 50%;
        height: 50px;
        margin-right: 20px;
        width: 50px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;

        button {
            background: ${ props => props.clicked ? '#CCC' : '#1877F2'};
            border-radius: 5px;
            color: #FFF;
            font-weight: 700;
            padding: 10px;
            text-align: center;
            width: 120px;
        }

        h2 {
            font-size: 20px;
            margin-bottom: 10px;
            width: 100%;
        }

        input {
            background: #EFEFEF;
            border-radius: 5px;
            cursor: text;
            flex-grow: grow;
            margin-bottom: 10px;
            overflow-wrap: anywhere;
            padding: 10px;
            width: 100%;
        }
        input[type=text] {
            flex-grow: 1;
        }
    }
    
    ${media} {
        border-radius: 0;
        height: 200px;
        padding: 15px;
        width: 100vw;

        form {

            button {
                font-size: 15px;
                margin-top: 3px;
                padding: 3px;
                width: 120px;
            }
        
            h2 {
                font-size: 18px;
                letter-spacing: -0.5px;
                margin-bottom: 15px;
                text-align: center;
            }

            input {
                font-size: 16px;
                margin-bottom: 5px;
            }
        }
        
        img {
            display: none;
        }
    }
`;