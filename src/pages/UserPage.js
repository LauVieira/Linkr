import React, { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import Trending from '../components/Trending';
import LayOutPosts from '../components/LayOutPosts';
import {Loading,CurrentPage,PostsListContainer} from '../components/SmallerComponents';


export default function UserPage () {
    const {header} = useContext(UserContext);
    let userId = useParams().id;
    const [userPosts,setUserPosts] = useState([]);
    const [title,setTitle] = useState('');

    
    useEffect(getUserPosts,[]);


    function getUserPosts () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userId}/posts?offset=0&limit=10`,header);
        request.then( response => {userPostsSucceeded(response)} ).catch(userPostsFailed);
    }


    function userPostsSucceeded (response) {
        setUserPosts([...response.data.posts]);
        setTitle(`${response.data.posts[0].user.username}'s posts`)
    }


    function userPostsFailed () {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    }


    return (
        <>
            {  
            userPosts.length === 0
                ? <Loading />

                : <CurrentPage>
                    <div>
                        <h1>{title}</h1>
                        <div>
                            <PostsListContainer>
                                {userPosts.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                            </PostsListContainer>
                          
                            <Trending />
                        </div>
                    </div>
                    
                </CurrentPage>
        }
       
        </>
        
    );
}



/*
id: 117
likes: []
link: "https://medium.com/mobile-web-dev/how-to-build-and-deploy-a-react-app-to-github-pages-in-less-than-5-minutes-d6c4ffd30f14"
linkDescription: "If you’re new to the react domain, my previous article on Getting Started with React is highly recommended. In this article, we are building a Personal Advisor React App which gives genuine life…"
linkImage: "https://miro.medium.com/max/1000/1*awQwl7p3e1iLSDz9OsPDZA.jpeg"
linkTitle: "How to build and deploy a React app to Github pages in less than 5 minutes"
text: "#teste"
user: {id: 45, username: "brutopan", 
*/