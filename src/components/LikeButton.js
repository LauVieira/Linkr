import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { media } from '../components/SmallerComponents';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import UserContext from '../contexts/UserContext';
import axios from 'axios';
//agataivanoff@yahoo.com.br

// Em que pé estamos do Like: dar like e dislike funciona, mas só ao atualizar a página e ainda não re renderiza. Coração também está mudando de cor/preenchimento, mas só quando atualiza também.

export default function LikeButton (props) {
    const { userData, header } = useContext(UserContext);
    const myUser = { id: userData.user.id, username: userData.user.username };
    const { likes, user, postId} = props;
    const { id, username } = user;
    const [ userLiked, setUserLiked ] = useState (false);

    useEffect(checkIfLiked,[]);

    function checkIfLiked () {     // Podemos melhorar essa função?
        setUserLiked(false);            // Mais prático definir como falso no começo e redefinir se for o caso, mas... Vai dar ruim aqui?
        if (likes.length > 0) {
            likes.forEach( like => {
                if (like.userId === myUser.id) setUserLiked(true);
            });
        }
    }

    function likeDislike () {
        console.log('hello');
        checkIfLiked();
        userLiked ? postLikeDislike('dislike') : postLikeDislike('like');
    }

    function postLikeDislike (aim) {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${postId}/${aim}`,{},header);
        request.then( response => console.log(response));
    }

    return (
        <LikeContainer color={userLiked ? '#AC0000' : '#FFF'}>  
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
        color: ${props => props.color};
        font-size: 22px;
    }
`;


/*
const { userData, header } = useContext(UserContext);
userData:
    token: "b1e7b642-890a-4ff2-8b49-dcf982d78ed9"
    user:
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
        email: "agataivanoff@yahoo.com.br"
        id: 43
        username: "Agata,aGata"
*/


/*   Resposta da requisição de like
data:
    post:
        likes: Array(3)
            0:
                userId: 46
                username: "aninha"

            1: {userId: 43, username: "Agata,aGata"}
            2: {userId: 49, username
*/

