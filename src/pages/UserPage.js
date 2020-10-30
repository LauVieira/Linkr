import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import Trending from '../components/Trending';
import LayOutPosts from '../components/LayOutPosts';
import { Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

export default function UserPage () {
    const { header } = useContext(UserContext);
    let userId = useParams().id;
    const [ userPosts, setUserPosts ] = useState([]);
    const [ title, setTitle ] = useState('');

    useEffect(getUserPosts,[userId]);

    function getUserPosts () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userId}/posts?offset=0&limit=10`,header);
        request.then( response => {userPostsSucceeded(response)} );
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
    }

    function userPostsSucceeded (response) {
        setUserPosts([...response.data.posts]);
        setTitle(`${response.data.posts[0].user.username}'s posts`);
    }

    return (
        <>
            { userPosts.length === 0

                ? <Loading />

                : <CurrentPage>
                    <h1>{title}</h1>

                    <div>
                        <PostsListContainer>
                            {userPosts.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                        </PostsListContainer>
                        
                        <Trending />
                    </div>
                </CurrentPage>
            }
        </>
    );
}