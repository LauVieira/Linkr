import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import { Link,useHistory } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext'

export default function Timeline () {
    const {userData} = useContext(UserContext);
    const [postsList,setPostsLists] = useState([]);
    getPostsList();

    function getPostsList () {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/posts?offset=0&limit=5',{headers: {'user-token': userData.token }});
        request.then( response => {postsSucceeded(response)} ).catch(postsFailed);
    }

    function postsSucceeded (response) {
        if (response.data.posts.length) {
            setPostsLists(...response.data.posts);
        }
        else {
            alert('Nenhum post encontrado')
        }
    }

    function postsFailed () {
        alert('Houve uma falha ao obter os posts, por favor atualize a página');
    }

    return (
        <>
            {  
                postsList.length === 0
                    ? <h1>Loading</h1>
                    : postsList.map( eachPost => <LayOutPosts post={eachPost} key={eachPost.id} />)
            }
        </>
    );
}


function LayOutPosts (props) {
    const {user,text,linkTitle,linkImage,linkDescription,link} = props;
    const {username,avatar} = user;

    return (
        <PostContainer>
            <div className='post-left'>Testando</div>
            <div className='post-right'></div>
        </PostContainer>
    );
}


const PostContainer = styled.article`
    display: flex;


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