import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Link,useParams } from "react-router-dom";
import axios from 'axios';
import styled from 'styled-components';
import UserContext from '../contexts/UserContext';
import Trending from '../components/Trending';
import LayOutPosts from '../components/LayOutPosts';
import Loading from '../components/SmallerComponents';


export default function UserPage () {
    const {userData} = useContext(UserContext);
    let userId = useParams().id;

    return (
    <div>
        <p>{userId}</p>
        <p>{userId}</p>
        <p>{userId}</p>
        <p>{userId}</p>
        <p>{userId}</p>
    </div>
        
    );
}