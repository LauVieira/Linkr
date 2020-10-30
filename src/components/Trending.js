import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import { media } from '../components/SmallerComponents';

export default function Trending () {
    const { header } = useContext(UserContext);
    const [ hashtags, setHashtags ] = useState([]);

    useEffect( () => {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending', header);
        request.then( ({data}) => {
            setHashtags(data.hashtags)
        });
        request.catch( () => {
            alert('There was an error when loading the hashtags, please refresh the page')
        });

    }, []);

    return (
        <ContainerTrending>

            <div className="title">
                Trending
            </div>

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
    height: 450px;
    width: 250px;
    
    .title {
        border-bottom: 1px solid #222;
        font: 700 27px 'Oswald', sans-serif;
        line-height: 3rem;
        letter-spacing: 0.05rem;
        padding: 20px;
    }

    .hashtag {
        font: 700 19px 'Lato', sans-serif; 
        letter-spacing: 0.05rem;
        margin: 10px 0;
        padding: 20px;
        line-height: 1.3rem;
        font-weight: 700;

        p {
            margin-bottom: 10px;
        }
    }

    ${media} {
        display: none;
    }
`;
