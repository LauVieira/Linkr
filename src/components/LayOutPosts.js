import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";


export default function LayOutPosts (props) {
    const {user,text,linkTitle,linkImage,linkDescription,link} = props.post;
    const {id,username,avatar} = user;
    const linkTo = `/user/${id}`;

    return (
        <PostContainer>

            <div className='post-left'><Link to={linkTo}><img src={avatar} /></Link></div>

            <div className='post-right'>
                <h2><Link to={linkTo}>{username}</Link></h2>
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

// const linkTo = `/pokemon/${idNumber}`;   //Linkr "/user/:id"

const PostContainer = styled.article`
    background: #151515;
    border-radius: 15px;
    color: #CECECE;
    display: flex;
    font-family: 'Lato', sans-serif;
    height: 300px;
    margin-bottom: 20px;
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
