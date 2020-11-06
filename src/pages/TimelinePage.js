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

//agataivanoff@yahoo.com.br

export default function TimelinePage () {
    const { userData, header } = useContext(UserContext);
    const { followingList, updateFollowingList } = useContext(FollowingContext);
    const [ postsList, setPostsLists ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(updateFollowingList,[]);             //Aqui é o melhor lugar pra chamar essa função pela primeira vez?
    useEffect(getPostsList,[]);
    
    function getPostsList () {
        //const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=15',header);
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts',header);
        request.then( response => {postsListSucceeded(response)} );
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
        //const request2 = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/following/posts',header);
        //request2.then( response => {console.log(response)} );
        //request2.catch( response => {console.log(response)} );
    }

    function postsListSucceeded (response) {
        setIsLoading(false);
        setPostsLists([...response.data.posts])
    }  

    return (
        <>
            <Header />

            { isLoading

                ? <Loading />

                : <CurrentPage>

                    <h1>timeline</h1>
                    
                    <div>
                        <PostsListContainer>

                            <UserInput getPostsList={getPostsList}/>

                            { followingList.length === 0
                                && <Message>You currently don't follow anybody, but you can find cool people to follow using our search :)</Message> 
                            }

                            { followingList.length !== 0
                                && postsList.length === 0
                                && <Message>Nobody has posted yed. Why don't you try some interesting topic of our trending session? :)</Message>
                            }

                            { followingList.length !== 0
                                && postsList.length > 0
                                && postsList.map( eachPost => 
                                    <LayOutPosts post={eachPost} getPostsList={getPostsList} key={eachPost.id} /> 
                                )
                            }

                        </PostsListContainer>
                        
                        <Trending />
                    </div>
                    
                </CurrentPage>
            }
        </>
    );
}


const Message = styled.div`
    color: #FFF;
    font: 700 20px 'Lato', sans-serif;
    height: 100%;
    margin-right: 30px;
    width: 600px;
`;