import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

export default function LikeButton (props) {
    const { userData, header } = useContext(UserContext);
    const myUser = { id: userData.user.id, username: userData.user.username };
    const { likes, postId} = props;
    const [ userLiked, setUserLiked ] = useState (false);

    useEffect(checkIfLiked,[]);

    function checkIfLiked () {
        if (likes.length > 0) {
            likes.forEach( like => {
                if (like.userId === myUser.id) setUserLiked(true);
            });
        }
    }

    function likeDislike () {
        checkIfLiked();
        userLiked ? postLikeDislike('dislike') : postLikeDislike('like');
    }

    function postLikeDislike (aim) {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/${aim}`,{},header);
        request.then( () => {
            setUserLiked(!userLiked);
            props.getPostsList();
        });
    }

    return (
        <LikeContainer userLiked={userLiked}>  
            <button onClick={likeDislike}>
                { userLiked ? <AiFillHeart /> : <AiOutlineHeart /> }
            </button>
            <p>{likes.length} likes</p>
        </LikeContainer>
    );
}

const LikeContainer = styled.div `
    text-align: center;

    button {
        color: ${props => props.userLiked ? '#AC0000' : '#FFF'};
        font-size: 22px;
    }
`;