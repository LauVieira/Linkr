import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import LayOutPosts from '../components/LayOutPosts';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import { Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

export default function MyLikesPage () {
    const { header } = useContext(UserContext);
    const [ myLikes, setMyLikes ] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
   
    useEffect(getPostsList,[]);

    function getPostsList () {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts/liked',header);
        request.then( response => { 
            setMyLikes([...response.data.posts]);
            setIsLoading(false);
        });
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
    }

    return (
        <>
            <Header />

            { isLoading

                ? <Loading />

                : <CurrentPage>
                    <h1>my likes</h1>

                    <div>
                        <PostsListContainer>
                            {myLikes.length > 0 && myLikes.map( eachPost => 
                                <LayOutPosts post={eachPost} getPostsList={getPostsList} key={eachPost.id} /> 
                            )}
                        </PostsListContainer>
                        
                        <Trending />
                    </div>
                </CurrentPage>
            }
        </>
    );
}