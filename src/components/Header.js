import React, { useContext, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { IoIosArrowDown } from 'react-icons/io';
import { MdSearch } from 'react-icons/md';
import { media } from '../components/SmallerComponents';
import UserContext from '../contexts/UserContext';

export default function Header () {
    const [ openMenu, SetOpenMenu ] = useState(false);
    const { header, userData, setUserData } = useContext(UserContext);
    const [ accountSearch, setAccountSearch ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    let history = useHistory();

    function releaseMenu (event) {
        if (!openMenu) event.preventDefault();
    }

    function releaseMenuLogOut (event) {
        openMenu ? setUserData({...{}}) : event.preventDefault();
    }

    function prepareSearch (nameSearched) {
        nameSearched.length > 2 ? startSearch(nameSearched) : setSearchResults([]);    // <<<<<<-------   mostrar pra Luanna
        setAccountSearch(nameSearched);
    }

    function startSearch (nameSearched) {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v1/linkr/users/search?username=${nameSearched}`,header);
        request.then( response => {sortingSearch(response.data.users)} );
        request.catch( () => alert('There was an error when loading the posts, please refresh the page') );
    }

    function sortingSearch (originalList) {
        const sortedList = [];
        originalList.forEach(element => { 
            element.isFollowingLoggedUser ? sortedList.unshift(element) : sortedList.push(element);
        });
        setSearchResults(sortedList);
    }

    function closingSearch (idLink) {
        setSearchResults([]);
        history.push(`/user/${idLink}`);
    }

    return (
        <StyledHeader>

            <Linkr>
                <Link to='/timeline'> linkr </Link>
            </Linkr>

            <SearchField searchDisplay={accountSearch.length}>
                <form>
                    <DebounceInput
                        debounceTimeout={300}
                        placeholder='Search for people and friends' 
                        onChange={(e) => prepareSearch(e.target.value)} 
                        value={accountSearch}
                    />
                    <MdSearch />
                </form>
                { searchResults.length > 0 &&
                    <ul>
                        {searchResults.map( accountFound =>  
                            <ListAccountsFound accountFound={accountFound} closingSearch={closingSearch} key={accountFound.id} />
                        )}
                    </ul>
                }
            </SearchField>

            <div>
                <Menu openMenu={openMenu} >
                    <div onClick={() => SetOpenMenu(!openMenu)}><IoIosArrowDown  /></div>
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

    return (
        <li onClick={ () => props.closingSearch(id)}>
            <img src={avatar}/>
            <p>{username}</p>
            {isFollowingLoggedUser && <span>following</span>}
        </li>
    );
}

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
    align-self: baseline;
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
        transform: ${props => props.openMenu ? 'rotate(180deg)' : 'rotate(0)'};
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
        opacity: ${props => props.openMenu ? '1' : '0'};
        padding: 20px;
        position: fixed;
        right: 0px;
        text-align: center;
        top: 50px;
        transition: 400ms ease;
        transform: ${props => props.openMenu ? 'translateY(0)' : 'translateY(-40px)'};
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

