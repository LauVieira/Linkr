import React, { createContext,useContext, useState } from 'react';
//import axios from 'axios';


const UserContext = createContext();
export default UserContext;


export function UserContextProvider (props) {                    // <<<<<<-------------------
    const [userData,setUserData] = useState({});

    function headerConfig () {
        const header = {headers: {"user-token": userData.token }}
        return header;
    }


    return (
        <UserContext.Provider value = {{userData, setUserData}}>
            {props.children}
        </UserContext.Provider>
    )
}



/*
USER DATA:
{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}


data:
token: "b1e7b642-890a-4ff2-8b49-dcf982d78ed9"
user:
avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
email: "agataivanoff@yahoo.com.br"
id: 43
username: "Agata,aGata"
*/





/*

function pedirQuizzes () {
    var header = configurarHeader();
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',header);
    requisicao.catch(exibirErro).then(carregarQuizzes);
}

*/
