import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import UserInput from '../components/UserInput';
import LayOutPosts from '../components/LayOutPosts';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import FollowingContext from '../contexts/FollowingContext';
import { media, Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

export default function TimelinePage () {
    const { userData, header } = useContext(UserContext);
    const { followingList, updateFollowingList } = useContext(FollowingContext);
    const [ postsList, setPostsLists ] = useState([]);

    useEffect(updateFollowingList,[]);             //Aqui é o melhor lugar pra chamar essa função pela primeira vez?
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

    return (
        <>
            <Header />

            { postsList.length === 0

                ? <Loading />

                : <CurrentPage>

                    <h1>timeline</h1>
                    
                    <div>
                        <PostsListContainer>
                            <UserInput getPostsList={getPostsList}/>

                            {postsList.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                        </PostsListContainer>
                        
                        <Trending />
                    </div>
                    
                </CurrentPage>
            }
        </>
    );
}


