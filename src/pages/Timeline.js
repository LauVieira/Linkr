import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext'

export default function Timeline () {
    const {userData} = useContext(UserContext);
    const [postsList,setPostsLists] = useState([]);

    useEffect(getPostsList,[]);

    function getPostsList () {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=5',{headers: {'user-token': userData.token }});
        request.then( response => {postsSucceeded(response)} ).catch(postsFailed);
    }

    function postsSucceeded (response) {
        response.data.posts.length
            ? setPostsLists([...response.data.posts])
            : alert('Nenhum post encontrado');
            
        console.log(response);
    }

    function postsFailed () {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    }

    return (
        <TimelinePage>
             {  
                postsList.length === 0
                    ? <Loading><img src='/styles/loading.gif' /><p>Loading, please wait :)</p></Loading>
                    : 
                        <feedContainer>
                            {postsList.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                        </feedContainer>
                    }
            
        </TimelinePage>
    );
}


function LayOutPosts (props) {
    const {user,text,linkTitle,linkImage,linkDescription,link} = props.post;
    const {username,avatar} = user;

    return (
        <PostContainer>

            <div className='post-left'><img src={avatar} /></div>

            <div className='post-right'>
                <h2>{username}</h2>
                <p>{text}</p>

                <LinkContainer>
                    <div>
                        <h3>{linkTitle}</h3>
                        <p>{linkDescription}</p>
                        <a href={link} target='_blank'>{link}</a>
                    </div>
                    <img src={linkImage} />
                </LinkContainer>
            </div>

        </PostContainer>
    );
}


const TimelinePage = styled.section`
    height: 100%;
    margin-top: 100px;
    width: 100%;
`;


const Loading = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    width: 100vw;

    p {
        color: #FFF;
        font: 500 24px 'Passion One', cursive;
        margin-top: 10px;
    }


`;

const feedContainer = styled.main`
    align-items: center;
    color: #FFF;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
   
`;


const PostContainer = styled.article`
    background: #151515;
    border-radius: 15px;
    color: #CECECE;
    display: flex;
    font-family: 'Lato', sans-serif;
    height: 300px;
    margin-top: 20px;
    padding: 25px;
    width: 600px;
    word-break: break;


    .post-left {
        height: 100%;
        margin-right: 20px;
    }
    .post-left img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }

    .post-right {
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;
        width: 100%;
        
        & > h2 {
            font-size: 18px;
            color: #FFF;
        }
        & > p {
            font-size: 16px;
            margin: 10px 0;
        }
    }
`;

const LinkContainer = styled.div`
    border: 1px solid #CECECE;
    border-radius: 10px;
    display: flex;
    height: 175px;
    overflow: hidden;
    word-break: break;
    
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 15px;
    }

    h3 {
        font-size: 16px;
    }

    p {
        color: #9B9595;
        font-size: 12px;
    }

    a {
        font-size: 12px;
    }

    img {
        height: 175px;
        width: 175px;
    }
    
`;


// Trending: <aside>



/*
    import {IoIosArrowUp} from 'react-icons/io';
    import {IoIosArrowDown} from 'react-icons/io';
    <IoIosArrowUp />
    <IoIosArrowDown />
*/






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










/*
useEffect(() => {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/cineflex/movies');
        request.then(answer => {
            setMoviesDocumentation(answer.data);
        });
        
    },[]);
    */