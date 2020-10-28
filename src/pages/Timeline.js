import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import LayOutPosts from '../components/LayOutPosts';

export default function Timeline () {
    const {userData} = useContext(UserContext);
    const [postsList,setPostsLists] = useState([]);

    useEffect(getPostsList,[]);

    function getPostsList () {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=15',{headers: {'user-token': userData.token }});
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
                    ? <Loading><img src='/images/loading.gif' /><p>Loading, please wait :)</p></Loading>
                    : 
                        <FeedContainer>
                            {postsList.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} /> )}
                        </FeedContainer>
                    }
            
        </TimelinePage>
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
    width: 100vw;

    p {
        color: #FFF;
        font: 500 24px 'Passion One', cursive;
        margin-top: 10px;
    }
`;

const FeedContainer = styled.main`
    align-items: center;
    color: #FFF;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
   
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

