import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const FollowingContext = createContext();
export default FollowingContext;

export function FollowingContextProvider (props) {
    const { header } = useContext(UserContext);
    const [ followingList, setFollowingList ] = useState([]);
    
    function updateFollowingList () {
        console.log('trynna update');
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows',header);
        request.then( response => {console.log(response.data)} );
    }

    function checkIfFollowed (postUserId) {
        console.log('testando2');
    }

    return (
        <FollowingContext.Provider value = {{followingList, updateFollowingList, checkIfFollowed}}>
            {props.children}
        </FollowingContext.Provider>
    );
}



//https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows
//agataivanoff@yahoo.com.br