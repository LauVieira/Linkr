import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import ReactHashtag from 'react-hashtag';
import styled from 'styled-components';
import { media } from './SmallerComponents';
import LikeButton from './LikeButton';

export default function LayOutPosts (props) {
    const { likes, user, text, linkTitle, linkImage, linkDescription, link } = props.post;
    const { id, username, avatar } = user;
    const linkToUser = `/user/${id}`;
    let history = useHistory();

    function openHashtag (hashtag) {                 //perguntar por clean code: melhor numa função ou em uma linha só no onClick?   :
        const hashtagName = hashtag.slice(1);
        history.push(`/hashtag/${hashtagName}`);           // onHashtagClick={ hashtag => history.push(`/hashtag/${hashtag.slice(1)}`) }  ????
    }

    return (
        <PostContainer>

            <div className='post-left'>
                <Link to={linkToUser}>
                    <img src={avatar} />
                </Link>

                <LikeButton likes={likes} user={user} postId={props.post.id}/>
            </div>

            <div className='post-right'>

                <h2><Link to={linkToUser}>
                    {username}
                </Link></h2>
                
                <p><ReactHashtag onHashtagClick={hashtag => openHashtag(hashtag)}>
                    {text}
                </ReactHashtag></p>

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

const PostContainer = styled.article`
    background: #151515;
    border-radius: 15px;
    color: #CECECE;
    display: flex;
    font-family: 'Lato', sans-serif;
    height: 300px;
    margin-bottom: 20px;
    overflow-wrap: anywhere;
    padding: 25px;
    width: 600px;

    .post-left {
        font-size: 12px;
        height: 100%;
        margin-right: 20px;
        text-align: center;

        img {
            border-radius: 50%;
            height: 50px;
            margin-bottom: 15px;
            width: 50px;
        }
    }
    
    .post-right {
        display: flex;
        flex-direction: column;
        flex-grow: 0;
        height: 100%;
        justify-content: space-evenly;
        width: 100%;
        
        & > h2 {
            font-size: 18px;
            color: #FFF;
        }

        & > p {
            font-size: 16px;
            margin: 10px 0;

            span {
                color: #FFF;
                font-weight: 700;
            }
        }
    }

    ${media} {
        border-radius: 0;
        height: 260px;
        padding: 15px;
        width: 100vw;

        .post-left {
            margin-right: 10px;

            img {
                height: 40px;
                width: 40px;
            }
        }
    }
`;

const LinkContainer = styled.div`
    border: 1px solid #404040;
    border-radius: 10px;
    display: flex;
    font-size: 12px;
    height: 175px;
    justify-content: space-between;
    overflow: hidden;
    
    div {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        overflow-wrap: anywhere;
        padding: 15px;
    }

    h3 {
        font-size: 16px;
    }

    p {
        color: #9B9595;
    }

    img {
        height: 175px;
        width: 175px;
    }

    ${media} {
        border-radius: 6px;
        font-size: 10px;
        height: 140px;

        div {
            padding: 5px;
        }

        h3 {
            font-size: 12px;
        }

        img {
            height: 140px;
            width: 120px;
        }
    }
`;


/*   props.post:

id: 198
likes: Array(3)
    0:
    createdAt: "2020-10-30T22:11:36.104Z"
    id: 539
    postId: 198
    updatedAt: "2020-10-30T22:11:36.104Z"
    user.id: 87
    user.username: "plazzinga_"
    userId: 87
    __proto__: Object
    1: {id: 550, userId: 49, postId: 198, createdAt: "2020-10-30T22:12:29.182Z", updatedAt: "2020-10-30T22:12:29.182Z", …}
    2: {id: 573, userId: 59, postId: 198, createdAt: "2020-10-30T22:36:46.621Z", updatedAt: "2020-10-30T22:36:46.621Z", …}
    length: 3
    __proto__: Array(0)
link: "https://app.slack.com/client/T018FQDU2KB/D0197E68P6E"
linkDescription: ""
linkImage: ""
linkTitle: "Slack"
text: "Confia no pai"
user:
    avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/57/avatar"
    id: 57
    username: "Silmar"

*/

