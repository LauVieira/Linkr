import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import UserContext from './UserContext';

const FollowingContext = createContext();
export default FollowingContext;

export function FollowingContextProvider (props) {
    const { header } = useContext(UserContext);
    const [ followingList, setFollowingList ] = useState([]);
    
    function updateFollowingList () {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/follows',header);
        request.then( response => {setFollowingList(response.data.users)} );
    }

    function checkIfFollowed (postUserId) {
        if (followingList.length === 0) return false;

        let isFollowed = false;
        followingList.forEach( userObj => {
            if (parseInt(postUserId) === userObj.id) isFollowed = true;
        });
        return isFollowed;
    }

    return (
        <FollowingContext.Provider value = {{followingList, updateFollowingList, checkIfFollowed}}>
            {props.children}
        </FollowingContext.Provider>
    );
}