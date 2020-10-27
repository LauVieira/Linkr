import React,{ createContext,useContext, useState }from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage'
import Timeline from '../pages/Timeline'
import {UserContextProvider} from '../contexts/UserContext'

export default function App () {
    return (    
        <Router>
            <Switch>
                <UserContextProvider>
                    <Route path='/' exact component={LoginPage} />
                    <Route path='/timeline' exact component={Timeline} />
                </UserContextProvider>
            </Switch>
        </Router>
    );
}


/* 


function enviarUsuario (objetoUsuario) {
    desabilitarHabilitarBotao();
    var requisicaoPost = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v1/buzzquizz/users",objetoUsuario);
    requisicaoPost.catch(erroUsuario).then(processarUsuario);
}

function processarUsuario (resposta) {
    tokenUsuario = resposta.data.token;
    pedirQuizzes();
    mudarDeTela(".telaDeLogin",".telaDeQuizzes");
}

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