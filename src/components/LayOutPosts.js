import React, { useContext, useState, useEffect, useRef} from 'react';
import { Link,useHistory } from 'react-router-dom';
import ReactHashtag from 'react-hashtag';
import styled from 'styled-components';
import { media } from './SmallerComponents';
import LikeButton from './LikeButton';
import { BsTrash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import UserContext from '../contexts/UserContext';
import Modal from '../components/Modal';
import axios from 'axios';

export default function LayOutPosts (props) {
    const { likes, user, text, linkTitle, linkImage, linkDescription, link } = props.post;
    const { id, username, avatar } = user;
    const linkToUser = `/user/${id}`;
    const { header, userData } = useContext(UserContext);
    const textEditRef = useRef();
    const [ modalIsOpen, setModalIsOpen ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ editingPost, setEditingPost ] = useState(false);
    const [ description, setDescription ] = useState(text);
    const [ onSendingPostEdition, setOnSendingPostEdition ] = useState(false);
    let history = useHistory();

    useEffect( () => 
        { if (textEditRef.current) textEditRef.current.focus() }, [editingPost]  
    );

    function openHashtag (hashtag) {
        const hashtagName = hashtag.slice(1);
        history.push(`/hashtag/${hashtagName}`);
    }

    function Delete () {
        setIsLoading(true);
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${props.post.id}`,header);
        request.then(deleteSucceeded).catch(errorHandle);
    }

    function deleteSucceeded () {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
        props.getPostsList();
    }

    function errorHandle () {
        setIsLoading(false);
        setModalIsOpen(!modalIsOpen);
        alert(`Sorry, we couln't delete your post`);
    }

    function sendEditedPostToServer() {
        setOnSendingPostEdition(true);
        const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/${props.post.id}`, {'text': description}, header);
        request.then(editSucceeded);
        request.catch(editFailed);
    }

    function editSucceeded () {
        setOnSendingPostEdition(false);
        setEditingPost(false);
        props.getPostsList();
    }

    function editFailed () {
        setOnSendingPostEdition(false);
        setEditingPost(false);
        alert(`Sorry, we couln't edit your post`);
        setPostMainDescription(text);
    }

    function onKeyDownLogic (event) {
        if(event.key === 'Escape') {
            setOnEditingPost(false);
            setDescription(text);
        }                               
        if (event.key === 'Enter') sendEditedPostToServer();
    }

    return (
        <PostContainer>

            <div className='post-left'>
                <Link to={linkToUser}>
                    <img src={avatar} />
                </Link>

                <LikeButton likes={likes} user={user} getPostsList={props.getPostsList} postId={props.post.id}/>
            </div>

            <div className='post-right'>

                <div className='icones'>

                    <h2>
                        <Link to={linkToUser}>
                            {username}
                        </Link>
                    </h2>

                    <div>
                        {userData.user.username === username && 
                            <BsTrash onClick={() => setModalIsOpen(!modalIsOpen)}/>
                        } 

                        {userData.user.username === username && 
                            <BsPencil onClick={() => {
                                setEditingPost(!editingPost)
                                setDescription(text)
                            }}/>
                        }

                    </div>

                    < Modal 
                        modalIsOpen = { modalIsOpen }
                        setModalIsOpen = { setModalIsOpen }
                        Delete={Delete}
                        isLoading = { isLoading }
                        className = 'modal-media'
                    />

                </div>

                {editingPost 
                    ? <input ref = {textEditRef}
                        disabled = {onSendingPostEdition}
                        value = {description}
                        onChange ={e => setDescription(e.target.value)}
                        onKeyDown = { event => onKeyDownLogic(event) }
                        /> 
                    
                    :  <div className='description'>
                            <p>
                                <ReactHashtag onHashtagClick={hashtag => openHashtag(hashtag)}>
                                    {text}
                                </ReactHashtag>
                            </p>
                        </div> 
                }

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
    margin-bottom: 20px;
    overflow-wrap: anywhere;
    padding: 25px;
    width: 600px;

    .post-left {
        font-size: 12px;
        height: 100%;
        margin-right: 20px;
        text-align: center;

        img {
            border-radius: 50%;
            height: 50px;
            margin-bottom: 15px;
            width: 50px;
        }
    }
    
    .post-right {
        display: flex;
        flex-direction: column;
        flex-grow: 0;
        height: 100%;
        justify-content: space-evenly;
        width: 100%;

        .description {
            span {
                color: #FFF;
                font-weight: 700;
            }
        }
        
        & > h2 {
            font-size: 18px;
            color: #FFF;
            
        }

        & > p {
            font-size: 16px;
            margin: 10px 0;
        }
        
        .icones {
            display:flex;
            justify-content: space-between;
        }

        svg{
            size: 18px; 
            margin-right: 10px;
            color: white;
        } 
    }

    ${media} {
        border-radius: 0;
        height: 260px;
        padding: 15px;
        width: 100vw;

        .post-left {
            margin-right: 10px;

            img {
                height: 40px;
                width: 40px;
            }
        }

        .post-right {
            .modal-media {
                width: 100vw;
                margin: 0;
            }
        }
    }
`;

const LinkContainer = styled.div`
    border: 1px solid #404040;
    border-radius: 10px;
    display: flex;
    font-size: 12px;
    height: 175px;
    justify-content: space-between;
    overflow: hidden;
    
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        overflow-wrap: anywhere;
        padding: 15px;
    }

    h3 {
        font-size: 16px;
    }

    p {
        color: #9B9595;
    }

    img {
        height: 175px;
        width: 175px;
    }

    ${media} {
        border-radius: 6px;
        font-size: 10px;
        height: 140px;

        div {
            padding: 5px;
        }

        h3 {
            font-size: 12px;
        }

        img {
            height: 140px;
            width: 120px;
        }
    }
`;