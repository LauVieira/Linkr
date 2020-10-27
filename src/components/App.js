import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoginPage from '../pages/LoginPage'


export default function App () {
    return (    
        <Router>
            <Switch>
                <Route path='/' exact={true} component={LoginPage} />
            </Switch>
        </Router>
    );
}

/*
<Header />
<MoviesContextProvider>
    <TicketsContextProvider>
                */


/*
Formato de envio inscrição:

{ "email": "ademilson@detal.com.br", "password": "123456", "username": "maleskena", "pictureUrl": "https://image.shutterstock.com/image-vector/user-avatar-icon-sign-profile-260nw-1145752283.jpg" }




Formato RESPOSTA inscrição:
{
  "token": "494c68f5-c9da-482e-949b-4254e6693f01",
  "user": {
    "id": 3,
    "email": "ademilson@detal.com.br",
    "username": "maleskena",
    "avatar": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQIAdgB2AAD/2wCEAAMDA
}
*/





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