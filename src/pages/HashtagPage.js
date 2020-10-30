import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Header from '../components/Header';
import LayOutPosts from '../components/LayOutPosts';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import { Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

export default function UserPage () {
    const hashtagName = useParams().hashtag;
    const [ hashtagPosts, setHashtagPosts ] = useState([]);
    const { header } = useContext(UserContext);

    useEffect(getIdsPosts,[hashtagName]);

    function getIdsPosts () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/${hashtagName}/posts?offset=0&limit=10`,header);
        request.then( response => { setHashtagPosts([...response.data.posts]) });
        request.catch( () => alert('There was an error when loading the posts, please refresh the page'));
    }

    return (
        <>  
            <Header />

            { hashtagPosts.length === 0
            
                ? <Loading />

                : <CurrentPage>
                    <h1>#{hashtagName}</h1>
                    
                    <div>
                        <PostsListContainer>
                            {hashtagPosts.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                        </PostsListContainer>
                        
                        <Trending />
                    </div>
                </CurrentPage>
            }
        </>
    );
}