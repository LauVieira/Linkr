import React, { createContext, useState } from 'react';

const UserContext = createContext();
export default UserContext;

export function UserContextProvider (props) {
    const [ userData, setUserData ] = useState({});
    const header = {headers: {"user-token": userData.token }};

    return (
        <UserContext.Provider value = {{userData, setUserData, header}}>
            {props.children}
        </UserContext.Provider>
    );
}