import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import { media } from '../components/SmallerComponents';
import UserContext from '../contexts/UserContext';

export default function Trending () {
    const [ hashtags, setHashtags ] = useState([]);
    const [hashtagSearched, setHashtagSearched] = useState('');
    const { header } = useContext(UserContext);
    let history = useHistory();

    useEffect( () => {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending', header);
        request.then( ({data}) => {
            setHashtags(data.hashtags)
        });
        request.catch( () => {
            alert('There was an error when loading the hashtags, please refresh the page')
        });

    }, []);

    function searchHashtag (event) {
        event.preventDefault();
        console.log('entrei');
    }

    return (
        <ContainerTrending>

            <div className="title">
                Trending
            </div>

            <form onSubmit={(event) => searchHashtag(event)}>
                <input type="text" placeholder="search hashtag" onChange={(e) => setHashtagSearched(e.target.value)} value={hashtagSearched}/>
            </form>

            <div className="hashtag">   
                {hashtags.map( hashtag => <Link to = {`/hashtag/${hashtag.name}`} key ={hashtag.id} ><p>{`# ${hashtag.name}`}</p></Link> )}
            </div>
        
        </ContainerTrending>
    );
}

const ContainerTrending = styled.div ` 
    background: #151515;
    border-radius: 15px;
    color: #FFF;
    flex-direction: column;
    height: 500px;
    width: 250px;
    
    .title {
        border-bottom: 1px solid #222;
        font: 700 27px 'Oswald', sans-serif;
        letter-spacing: 0.05rem;
        line-height: 3rem;
        padding: 20px;
    }

    .hashtag {
        font: 700 19px 'Lato', sans-serif; 
        letter-spacing: 0.05rem;
        line-height: 1.3rem;
        margin: 10px 0;
        padding: 20px;

        p {
            margin-bottom: 10px;
        }
    }

    ${media} {
        display: none;
    }
`;
