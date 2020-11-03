import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import LayOutPosts from '../components/LayOutPosts';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import { Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

//agataivanoff@yahoo.com.br
//falar com a luanna do align self

export default function UserPage () {
    const { userData, header } = useContext(UserContext);
    let userId = useParams().id;          // Posso mudar pra const?
    const myUserId = userData.user.id;
    const [ userPosts, setUserPosts ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [followedAccount, setFollowedAccount] = useState(false);
    const [requestProcessing, setRequestProcessing] = useState(false);

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

    function followUnfollow () {
        console.log('hey');
    }

    function requestFailed () {
        alert(`Sorry, we couldn't complete this operation`);
    }

    return (
        <>
            <Header />

            { userPosts.length === 0

                ? <Loading />

                : <CurrentPage>

                    <UserPageBasics followedAccount={followedAccount}>
                        <h1>{title}</h1>
                        {userId !== myUserId && 
                            (followedAccount
                                ? <button disabled={requestProcessing} onClick={followUnfollow}>Unfollow</button> 
                                : <button disabled={requestProcessing} onClick={followUnfollow}>Follow</button>
                            )
                        }
                    </UserPageBasics>
                    

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


const UserPageBasics = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    button {
        align-self: center;
        background: ${ props => props.followedAccount ? '#FFF' : '#1877F2'};
        border-radius: 5px;
        color: ${ props => props.followedAccount ? '#1877F2' : '#FFF'};
        font: 700 14px 'Lato', sans-serif;
        padding: 10px 0;
        text-align: center;
        width: 120px;
    }    
`;