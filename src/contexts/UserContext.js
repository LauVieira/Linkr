import React, { createContext,useState } from 'react';


const UserContext = createContext();
export default UserContext;


export function UserContextProvider (props) {
    const [userData,setUserData] = useState({});
    const header = {headers: {"user-token": userData.token }};


    return (
        <UserContext.Provider value = {{userData, setUserData, header}}>
            {props.children}
        </UserContext.Provider>
    )
}


/*
USER DATA:
{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}


userData{
    {token: "b1e7b642-890a-4ff2-8b49-dcf982d78ed9"}
    {user:
        avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
        email: "agataivanoff@yahoo.com.br"
        id: 43
        username: "Agata,aGata"
    }
}
*/
