import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {Link} from "react-router-dom";
import UserContext from '../contexts/UserContext'

export default function Trending () {

    const {userData} = useContext(UserContext);
    
    const [hashtags, setHashtags] = useState([]);

    useEffect( () => {
    
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/hashtags/trending", { headers: {'user-token': userData.token }});
        //enviar requisião do trending da mesma forma da requisição da timeline

        request.then( ({data}) => {
            setHashtags(data.hashtags);
        })
        request.catch( ({data}) => {
            alert("Houve uma falha em obter as hashtags. Atualize a página");
        });
    } , []);

    console.log("Hastags",hashtags);
    
    return (
        <ContainerTrending>
        <div className="title">
            Trending
        </div>
        <div className="hashtag">   
            {hashtags.map( hashtag => <Link to = {`/hashtag/${hashtag.name}`} key = {hashtag.id} ><p >{`# ${hashtag.name}`}</p></Link> )}
        </div>
        
    </ContainerTrending>
        
    );
}

const ContainerTrending = styled.div ` 
    background: black;
    border-radius: 1rem;
    height: 20rem;
    margin-top: 20px;
    width: 19.8rem;
    
    
    .title {
        border-bottom: 0.5px solid #333;
        color: white;
        font-family: 'Oswald', sans-serif;
        font-size: 27px;
        line-height: 3rem;
        letter-spacing: 0.05rem;
        padding-left: 10px;
    }
    .hashtag {
        font-family: 'Lato', sans-serif; 
        color: white;
        font-size: 19px;
        letter-spacing: 0.05rem;
        padding: 10px;
        line-height: 1.3rem;
        font-weight: 700;
    }
`;
