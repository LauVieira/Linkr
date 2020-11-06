import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/Header';
import LayOutPosts from '../components/LayOutPosts';
import Trending from '../components/Trending';
import UserContext from '../contexts/UserContext';
import FollowingContext from '../contexts/FollowingContext';
import { Loading, CurrentPage, PostsListContainer } from '../components/SmallerComponents';

//agataivanoff@yahoo.com.br
// Refatorar para começar com o single data e depois ver se tem post pra exibir

export default function UserPage () {
    const userId = useParams().id;          // Posso mudar pra const?
    const { userData, header } = useContext(UserContext);
    const myUserId = userData.user.id;
    const { updateFollowingList, checkIfFollowed } = useContext(FollowingContext);
    const [ userPosts, setUserPosts ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ followedAccount, setFollowedAccount ] = useState(false);
    const [ requestProcessing, setRequestProcessing ] = useState(false);
    const [ isLoading, setIsLoading ] = useState (true);

    useEffect(getPostsList,[userId]);
    useEffect( 
        () => setFollowedAccount(checkIfFollowed(userId)),
    [userId]);
   

    function getPostsList () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userId}/posts?offset=0&limit=10`,header);
        request.then( response => {userPostsSucceeded(response)} );
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
    }

    function userPostsSucceeded (response) {
        if (response.data.posts.length) {
            setUserPosts([...response.data.posts]);
            setTitle(`${response.data.posts[0].user.username}'s posts`);
            setIsLoading(false);
        }
        else {
            setUserPosts([]);           //mudar se der tempo
            getSingleUser();
        }
    }

    function getSingleUser () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userId}`,header);
        request.then( response => {singleDataSucceeded(response)} );
    }

    function singleDataSucceeded (response) {
        setTitle(`${response.data.user.username}'s posts`);
        setIsLoading (false);
    }

    function followUnfollow () {
        setRequestProcessing(true);
        followedAccount ? postFollowUnfollow('unfollow') : postFollowUnfollow('follow'); 
    }

    function postFollowUnfollow (aim) {
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userId}/${aim}`,{},header);
        request.then(followUnfollowSucceeded).catch(followUnfollowFailed);
    }

    function followUnfollowSucceeded () {
        setRequestProcessing(false);
        updateFollowingList();
        setFollowedAccount(!followedAccount);     // Não é a melhor opção, mas como lidar com a assincronicidade/delay? Recarregar página?
    }

    function followUnfollowFailed () {
        setRequestProcessing(false);
        alert(`Sorry, it wasn't possible to complete this operation`);
    }

    return (
        <>
            <Header />

            { isLoading

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
                        { userPosts.length > 0
                            ? <PostsListContainer>
                                {userPosts.map( eachPost => <LayOutPosts post={eachPost} getPostsList={getPostsList} key={eachPost.id} /> )}
                              </PostsListContainer>
                              
                            : <NoPost>
                                <img src='/images/noPosts.jpg' />
                                <p>This user has no posts to be displayed</p>
                              </NoPost>
                        }
                        
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

const NoPost = styled.main`
    align-items: center;
    color: #FFF;
    display: flex;
    flex-direction: column;
    font: 700 20px 'Lato', sans-serif;
    height: 100%;
    margin-right: 30px;
    width: 600px;

    img {
        border-radius: 20px 0;
        width: 300px;
        margin-bottom: 10px;
    }
`;


//falar com a luanna do align self
//posso simplificar o button que está com os ternários?