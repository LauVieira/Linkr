import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Trending from '../components/Trending';
import LayOutPosts from '../components/LayOutPosts';
import {Loading,CurrentPage,PostsListContainer} from '../components/SmallerComponents';


export default function Timeline () {
    const {userData,header} = useContext(UserContext);             //     <<<<<<<<<<<<-------------------
    const [postsList,setPostsLists] = useState([]);
    const [userLink,setUserLink] = useState('');
    const [userComment,setUserComment] = useState('');
    const [clicked,setClicked] = useState(false);


    useEffect(getPostsList,[]);


    function getPostsList () {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=15',header);
        request.then( response => {postsListSucceeded(response)} ).catch(postsListFailed);
    }


    function postsListSucceeded (response) {
        response.data.posts.length
            ? setPostsLists([...response.data.posts])
            : alert('No posts found');
    }


    function postsListFailed () {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    }


    function submitComment () {
        event.preventDefault();

        if (userLink.length) {
            setClicked(true);
            sendPost(formatObj());
        }
        else {
            alert("Sorry, you can't publish without a link");
        }
    }


    function formatObj () {
        const postObj = userComment.length? ({link: userLink, text: userComment}) : ({link: userLink});
        return postObj;
    }

    
    function sendPost (postObj) {
        console.log(postObj);
        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts',postObj,header);
        request.then(userPostSucceeded).catch(userPostFailed);
    }
    

    function userPostSucceeded () {
        setUserLink('');
        setUserComment('');
        setClicked(false);
        getPostsList();
    }


    function userPostFailed () {
        alert('Sorry, there was an error when publishing your link');
        setClicked(false);
    }


    return (
        <>
             {  
                postsList.length === 0
                    ? <Loading />

                    : <CurrentPage>
                        <div>
                            <h1>timeline</h1>
                            <div>
                                <PostsListContainer>
                                    <UserInput userData={userData} 
                                        submitComment={submitComment} 
                                        setUserLink={setUserLink}
                                        userLink={userLink}
                                        setUserComment={setUserComment}
                                        userComment={userComment}
                                        clicked={clicked}
                                    />

                                    {postsList.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                                </PostsListContainer>
                                
                                <Trending />
                            </div>
                        </div>
                        
                    </CurrentPage>
            }
            
        </>
    );
}


function UserInput (props) {
    const {userData,submitComment,setUserLink,userLink,setUserComment,userComment,clicked} = props;

    return (
        <UserInputContainer>
            <img src={userData.user.avatar} />

            <form onSubmit={(event) => submitComment(event)}>
                <h2>What do you want to bookmark today?</h2>
                <input type="url" placeholder="https//..." onChange={(e) => setUserLink(e.target.value)} value={userLink} disabled={clicked}/>
                <input type="text" placeholder="Would you like to leave a comment?" onChange={(e) => setUserComment(e.target.value)} value={userComment} disabled={clicked}/>

                {   clicked
                    ? <button disabled={clicked}>Publishing...</button> 
                    : <button type="submit">Publish</button>  
                }  
            </form>
        </UserInputContainer>
    );
}


const UserInputContainer = styled.div`
    background: #FFF;
    border-radius: 15px;
    color: #707070;
    display: flex;
    font-family: 'Lato', sans-serif;
    font-weight: 300;
    height: 250px;
    margin-bottom: 20px;
    padding: 25px;
    width: 600px;

    img {
        border-radius: 50%;
        height: 50px;
        margin-right: 20px;
        width: 50px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 100%;

        button {
            background: #1877F2;
            border-radius: 5px;
            color: #FFF;
            font-weight: 700;
            padding: 10px;
            text-align: center;
            width: 120px;
        }

        h2 {
            font-size: 20px;
            margin-bottom: 10px;
            width: 100%;
        }

        input {
            background: #EFEFEF;
            border-radius: 5px;
            flex-grow: grow;
            margin-bottom: 10px;
            overflow-wrap: anywhere;
            padding: 10px;
            width: 100%;
        }
        input[type=text] {
            flex-grow: 1;
        }
    }
    


`;

// Trending: <aside>


/*
o que queremos: Response.data.posts


data {
posts: Array(2)
0: {id: 13, text: "COMO INSTALA O ZAPEEEEEEEEEEE #zap", link: "https://www.reddit.com/r/orochinho/comments/eta0o6/como_que_instala_o_zap/", linkTitle: "r/orochinho - COMO QUE INSTALA O ZAP????", linkDescription: "143k members in the orochinho community. Vai na pa…voltou e nem voltará, só deixamos restrito para …", …}
1: {id: 12, text: "#lofi", link: "https://youtu.be/5qap5aO4i9A", linkTitle: "lofi hip hop radio - beats to relax/study to", linkDescription: "Thank you for listening, I hope you will have a go…sic and more → https://bit.ly/chilledcow-playl...", …}
length: 2 }


0: {
id: 13
likes: []
link: "https://www.reddit.com/r/orochinho/comments/eta0o6/como_que_instala_o_zap/"
linkDescription: "143k members in the orochinho community. Vai na paz irmão fica com Deus 😪👊 NOTA: o subreddit não voltou e nem voltará, só deixamos restrito para …"
linkImage: "https://preview.redd.it/x433fqa84qc41.jpg?auto=webp&s=cf2cbe461fbfb955f37fe2f6198357d2bfbddbf5"
linkTitle: "r/orochinho - COMO QUE INSTALA O ZAP????"
text: "COMO INSTALA O ZAPEEEEEEEEEEE #zap"
user: {id: 31, username: "testandoNiche", avatar: "data:image/jpeg;base64,/9j/4QzVRXhpZgAATU0AKgAAAAg…fbrirb9NvpxYuFabdMkq4faH8cVbfly26YqsFKZFXGm2Kv//Z"}
}
*/


