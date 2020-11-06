import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { media } from '../components/SmallerComponents';
import UserContext from '../contexts/UserContext';

export default function Trending () {
    const { header } = useContext(UserContext);
    const [ hashtags, setHashtags ] = useState([]);
    const [ hashtagSearched, setHashtagSearched ] = useState('');
    let history = useHistory();

    useEffect( () => {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending', header);
        request.then( ({data}) => { setHashtags(data.hashtags) });
        request.catch( () => { alert('There was an error when loading the hashtags, please refresh the page') });
    }, []);

    function searchHashtag (event) {
        event.preventDefault();

        if (hashtagSearched.length) {
            history.push(`/hashtag/${hashtagSearched}`);
            setHashtagSearched('');
        }
        else {
            alert('Please fill in the search field');
        }
    }

    return (
        <ContainerTrending>

            <div className='title'>
                Trending
            </div>

            <form onSubmit={(event) => searchHashtag(event)}>
                <input type='text' 
                    placeholder='search hashtag' 
                    onChange={(e) => setHashtagSearched(e.target.value)} 
                    value={hashtagSearched}
                />
            </form>

            <div className='hashtag'>   
                {hashtags.map( hashtag => 
                    <Link to = {`/hashtag/${hashtag.name}`} key ={hashtag.id} >
                        <p>{`# ${hashtag.name}`}</p>
                    </Link>
                )}
            </div>
        
        </ContainerTrending>
    );
}

const ContainerTrending = styled.div ` 
    align-self: flex-start;
    background: #151515;
    border-radius: 15px;
    color: #FFF;
    flex-direction: column;
    overflow: hidden;
    width: 250px;
    
    .title {
        border-bottom: 1px solid #222;
        font: 700 27px 'Oswald', sans-serif;
        letter-spacing: 0.05rem;
        line-height: 3rem;
        padding: 20px;
    }

    form {
        margin-top: 10px;
        text-align: center;
        width: 100%;
    }

    input {
        background: #333;
        border-radius: 5px;
        cursor: text;
        font: 400 18px 'Lato', sans-serif;
        padding: 5px 20px;
        text-align: left;
        width: 90%;
    }

    .hashtag {
        font: 700 19px 'Lato', sans-serif; 
        letter-spacing: 0.05rem;
        line-height: 1.3rem;
        padding: 10px 20px 20px 20px;

        p {
            margin-bottom: 10px;
        }
    }

    ${media} {
        display: none;
    }
`;
