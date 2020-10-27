import React, { createContext, useState } from 'react';
//import axios from 'axios';


const UserContext = createContext();
export default UserContext;


export function UserContextProvider (props) {
    const [userData,setUserData] = useState({});


    return (
        <UserContext.Provider value = {userData, setUserData}>
            {props.children}
        </UserContext.Provider>
    )
}


/*

function configurarHeader () {
    var header = {
        headers: {
        "User-Token": tokenUsuario }
    }

    return header;
}

function pedirQuizzes () {
    var header = configurarHeader();
    var requisicao = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/quizzes',header);
    requisicao.catch(exibirErro).then(carregarQuizzes);
}

*/
