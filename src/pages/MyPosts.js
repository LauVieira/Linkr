import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link,useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Trending from '../components/Trending';
import LayOutPosts from '../components/LayOutPosts';
import {Loading,CurrentPage,PostsListContainer} from '../components/SmallerComponents';


export default function MyPostsPage () {
    const {header, userData} = useContext(UserContext);
    const [myPosts,setMyPosts] = useState([]);
   
    
    useEffect(getUserPosts,[]);


    function getUserPosts () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/${userData.user.id}/posts?offset=0&limit=10`,header);
        request.then( response => {userPostsSucceeded(response)} ).catch(userPostsFailed);
    }


    function userPostsSucceeded (response) {
        setMyPosts([...response.data.posts]);
    }


    function userPostsFailed () {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    }


    return (
        <>
            {  
            myPosts.length === 0
                ? <Loading />

                : <CurrentPage>
                    <div>
                        <h1>my posts</h1>
                        <div>
                            <PostsListContainer>
                                {myPosts.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
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
npm install react-hashtag --save
npm WARN saveError ENOENT: no such file or directory, open '/home/laura/Documents/Bootcamp/FrontEnd/Projetos/Linkr/package.json'
npm WARN enoent ENOENT: no such file or directory, open '/home/laura/Documents/Bootcamp/FrontEnd/Projetos/Linkr/package.json'
npm WARN webpack-dev-middleware@3.7.2 requires a peer of webpack@^4.0.0 but none is installed. You must install peer dependencies yourself.
npm WARN react-hashtag@2.1.2 requires a peer of react@^16.7.0 but none is installed. You must install peer dependencies yourself.
npm WARN react-hashtag@2.1.2 requires a peer of react-dom@^16.7.0 but none is installed. You must install peer dependencies yourself.
npm WARN react-hashtag@2.1.2 requires a peer of preact@^8.4.2 but none is installed. You must install peer dependencies yourself.
npm WARN Linkr No description
npm WARN Linkr No repository field.
npm WARN Linkr No README data
npm WARN Linkr No license field.
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules/fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"linux","arch":"x64"})
*/