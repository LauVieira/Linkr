import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import LayOutPosts from '../components/LayOutPosts';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import { Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

export default function MyPostsPage () {
    const { header, userData } = useContext(UserContext);
    const [ myPosts, setMyPosts ] = useState([]);
   
    useEffect(getUserPosts,[]);

    function getUserPosts () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userData.user.id}/posts?offset=0&limit=10`,header);
        request.then( response => { setMyPosts([...response.data.posts]) });
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
    }

    return (
        <>
            <Header />

            { myPosts.length === 0

                ? <Loading />

                : <CurrentPage>
                    <h1>my posts</h1>

                    <div>
                        <PostsListContainer>
                            {myPosts.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                        </PostsListContainer>
                        
                        <Trending />
                    </div>
                </CurrentPage>
            }
        </>
    );
}