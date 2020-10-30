import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import LayOutPosts from '../components/LayOutPosts';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import { media, Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

export default function TimelinePage () {
    const { userData, header } = useContext(UserContext);
    const [ clicked, setClicked ] = useState(false);
    const [ postsList, setPostsLists ] = useState([]);
    const [ userComment, setUserComment ] = useState('');
    const [ userLink, setUserLink ] = useState('');

    useEffect(getPostsList,[]);

    function getPostsList () {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=15',header);
        request.then( response => {postsListSucceeded(response)} );
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
    }

    function postsListSucceeded (response) {
        response.data.posts.length
            ? setPostsLists([...response.data.posts])
            : alert('No posts found');
    }

    function submitComment () {
        event.preventDefault();

        if (userLink.length) {
            setClicked(true);
            sendPost(formatObj());
        }
        else {
            alert("Sorry, you can't publish without a link");
        }
    }

    function formatObj () {
        const postObj = userComment.length? ({link: userLink, text: userComment}) : ({link: userLink});
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
        getPostsList();
    }

    function userPostFailed () {
        alert('Sorry, there was an error when publishing your link');
        setClicked(false);
    }

    return (
        <>
            <Header />

            { postsList.length === 0

                ? <Loading />

                : <CurrentPage>

                    <h1>timeline</h1>
                    
                    <div>
                        <PostsListContainer>
                            <UserInput userData={userData} 
                                submitComment={submitComment} 
                                setUserLink={setUserLink}
                                userLink={userLink}
                                setUserComment={setUserComment}
                                userComment={userComment}
                                clicked={clicked}
                            />

                            {postsList.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                        </PostsListContainer>
                        
                        <Trending />
                    </div>
                    
                </CurrentPage>
            }
        </>
    );
}

function UserInput (props) {
    const { userData, submitComment, setUserLink, userLink, setUserComment, userComment, clicked } = props;

    return (
        <UserInputContainer>
            <img src={userData.user.avatar} />

            <form onSubmit={(event) => submitComment(event)}>

                <h2>What do you want to bookmark today?</h2>

                <input type="url" 
                    placeholder="https//..." 
                    onChange={(e) => setUserLink(e.target.value)} 
                    value={userLink} 
                    disabled={clicked}
                />

                <input type="text" 
                    placeholder="Would you like to leave a comment?" 
                    onChange={(e) => setUserComment(e.target.value)} 
                    value={userComment} 
                    disabled={clicked}
                />

                {   clicked
                    ? <button disabled={clicked}>Publishing...</button> 
                    : <button type="submit">Publish</button>  
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
            background: #1877F2;
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