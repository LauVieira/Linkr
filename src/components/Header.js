import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { media } from '../components/SmallerComponents';
import UserContext from '../contexts/UserContext';
import axios from 'axios';

//agataivanoff@yahoo.com.br
// mudar props de css do Menu
// tratar pra quando o usuário clica no perfil que já está sendo exibido

export default function Header () {
    const [ OpenMenu, SetOpenMenu ] = useState(false);
    const { header, userData, setUserData } = useContext(UserContext);
    const [ accountSearch, setAccountSearch ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);

    function releaseMenu (event) {
        if (!OpenMenu) event.preventDefault();
    }

    function releaseMenuLogOut (event) {
        OpenMenu ? setUserData({...{}}) : event.preventDefault();
    }

    function prepareSearch (nameSearched) {
        setAccountSearch(nameSearched);
        accountSearch.length > 1 ? startSearch() : setSearchResults([]);   //mudar esse length
    }

    function startSearch () {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${accountSearch}`,header);
        request.then( response => {sortingSearch(response.data.users)} );
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
    }

    function sortingSearch (originalList) {
        const sortedList = [];
        originalList.forEach (element => { 
            element.isFollowingLoggedUser ? sortedList.unshift(element) : sortedList.push(element);
        });
        setSearchResults(sortedList);
    }

    return (                //mudar props do searchField no futuro, pelo tamanho da lista de retorno da busca || mudar props do AccountFound
        <StyledHeader>

            <Linkr>
                <Link to='/timeline'> linkr </Link>
            </Linkr>

            <SearchField searchDisplay={accountSearch.length}>
                <form>
                    <input placeholder='Search for people and friends' onChange={(e) => prepareSearch(e.target.value)} value={accountSearch}/>
                    <MdSearch />
                </form>
                { searchResults.length > 0 &&
                    <ul>
                        {searchResults.map( accountFound =>  <ListAccountsFound accountFound={accountFound} key={accountFound.id}/>)}
                    </ul>
                }
            </SearchField>

            <div>
                <Menu
                 translate={OpenMenu? 'translateY(0)':'translateY(-40px)'}
                 opacity={OpenMenu? '1' : '0'}
                 rotate={OpenMenu? 'rotate(180deg)':'rotate(0)'}
                >
                    <div onClick={() => SetOpenMenu(!OpenMenu)}><IoIosArrowDown  /></div>
                    <img src={userData.user.avatar}/>

                    <nav>
                        <Link to='/my-posts' onClick={(event) => releaseMenu(event)}>My posts</Link>
                        <Link to='/my-posts' onClick={(event) => releaseMenu(event)}>My likes</Link>
                        <Link to='/' onClick={(event) => releaseMenuLogOut(event)}>Logout</Link>
                    </nav>
                </Menu>
            </div>

        </StyledHeader> 
    );
}

function ListAccountsFound (props) {
    const {id, username, avatar, isFollowingLoggedUser} = props.accountFound;
    const linkToUser = `/user/${id}`;

    return (
        <Link to={linkToUser}>
            <li>
                <img src={avatar}/>
                <p>{username}</p>
                {isFollowingLoggedUser && <span>following</span>}
            </li>
        </Link>
    );
}


/*
response.data.users

(3) [{…}, {…}, {…}]
0: {id: 46, username: "aninha", avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/46/avatar", isFollowingLoggedUser: true}
1: {id: 90, username: "androlinhas", avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/90/avatar", isFollowingLoggedUser: false}
2: {id: 100, username: "anelisepop", avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/100/avatar", isFollowingLoggedUser: false}
length: 3
*/   


const StyledHeader = styled.div `
    background-color: #151515;
    display: flex;
    height: 70px;
    justify-content: space-between;
    left: 0;
    padding: 10px 30px; 
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 2;

    ${media} {
        padding: 0 20px;
    }
`;

const Linkr = styled.p `
    color: white;
    font: 700 3.1rem 'Passion One', cursive;
    letter-spacing: 0.05rem;
`;

const SearchField = styled.div`
    align-self: ${ props => props.searchDisplay > 2 ? 'baseline' : 'center'};
    background: #E7E7E7;
    border-radius: 8px;
    font: 18px 'Lato', sans-serif;
    width: 500px;

    form {
        align-self: center;
        position: relative;

        input {
            background: #FFF;
            border-radius: 8px;
            color: #515151;
            height: 45px;
            padding-left: 20px;
            width: 100%;
        }
        input::placeholder {
            color: #C6C6C6;
        }

        svg {
            color: #C6C6C6;
            display: ${ props => props.searchDisplay > 0 ? 'none' : 'default'};
            font-size: 24px;
            position: absolute;
            right: 20px;
            top: 9px;
        }
    }

    ul {
        padding: 0 20px 15px 20px;

        img {
            border-radius: 50%;
            height: 35px;
            width: 35px;
        }

        li {
            align-items: center;
            display: flex;
            margin-top: 15px;
        }

        p {
            color: #515151;
            margin: 0 10px;
        }

        span {
            color: #C5C5C5;
        }
        span:before {
            content: '•';
            margin-right: 5px;
        }
    }
    
`;


const Menu = styled.div`
    align-items: center;
    color: #FFF;
    display: flex;
    margin-right: 10px;

    div {
        cursor: pointer;
        font-size: 40px;
        margin-right: 10px;
        transform: ${props => props.rotate};
        z-index: 2;
    }

    img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
        z-index: 2;
    }

    nav {
        background: #151515;
        border-bottom-left-radius: 25px;
        display:flex;
        flex-direction:column;
        font: 700 20px 'Lato', sans-serif;
        opacity: ${props => props.opacity};
        padding: 20px;
        position: fixed;
        right: 0px;
        text-align: center;
        top: 50px;
        transition: 400ms ease;
        transform: ${props => props.translate};
        width: 170px;
        z-index: 1;
    }

    a {
        padding: 10px;
    }

    ${media} {

        div {
            font-size: 20px;
        }

        img {
            height: 40px;
            width: 40px;
        }

        nav {
            font-size: 14px;
            padding: 10px;
            width: 130px;

            a {
                padding: 5px;
            }
        }
    }
`;

