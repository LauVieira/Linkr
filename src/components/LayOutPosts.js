import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext'

export default function LayOutPosts (props) {
    const {user,text,linkTitle,linkImage,linkDescription,link} = props.post;
    const {username,avatar} = user;

    return (
        <PostContainer>

            <div className='post-left'><img src={avatar} /></div>

            <div className='post-right'>
                <h2>{username}</h2>
                <p>{text}</p>

                <LinkContainer>
                    <div>
                        <h3>{linkTitle}</h3>
                        <p>{linkDescription}</p>
                        <a href={link} target='_blank'>{link}</a>
                    </div>
                    <img src={linkImage} />
                </LinkContainer>
            </div>

        </PostContainer>
    );
}


const PostContainer = styled.article`
    background: #151515;
    border-radius: 15px;
    color: #CECECE;
    display: flex;
    font-family: 'Lato', sans-serif;
    height: 300px;
    margin-top: 20px;
    overflow-wrap: anywhere;
    padding: 25px;
    width: 600px;
    word-break: break;


    .post-left {
        height: 100%;
        margin-right: 20px;
    }
    .post-left img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }

    .post-right {
        display: flex;
        flex-direction: column;
        flex-grow: 0;
        height: 100%;
        justify-content: space-evenly;
        width: 100%;
        
        & > h2 {
            font-size: 18px;
            color: #FFF;
        }
        & > p {
            font-size: 16px;
            margin: 10px 0;
        }
    }
`;


const LinkContainer = styled.div`
    border: 1px solid #404040;
    border-radius: 10px;
    display: flex;
    height: 175px;
    justify-content: space-between;
    overflow: hidden;
    word-break: break;
    
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 15px;
    }

    h3 {
        font-size: 16px;
    }

    p {
        color: #9B9595;
        font-size: 12px;
    }

    a {
        font-size: 12px;
    }

    img {
        height: 175px;
        width: 175px;
    }
    
`;
