import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { media } from '../components/SmallerComponents';
import UserContext from '../contexts/UserContext'

//agataivanoff@yahoo.com.br
// vou armazenar em contexto as contas seguidas pelo usuário???
// consertar not do margin-bottom li

export default function Header () {
    const [ OpenMenu, SetOpenMenu ] = useState(false);
    const { userData, setUserData } = useContext(UserContext);
    const [accountSearched, setAccountSearched] = useState('teste');

    function releaseMenu (event) {
        if (!OpenMenu) event.preventDefault();
    }

    function releaseMenuLogOut (event) {
        OpenMenu ? setUserData({...{}}) : event.preventDefault();
    }

    return (                //mudar props do searchField no futuro, pelo tamanho da lista de retorno da busca || mudar props do AccountFound
        <StyledHeader>

            <Linkr> 
                <Link to='/timeline'> linkr </Link>
            </Linkr>

            <SearchField searchDisplay={accountSearched.length > 3}>
                <form>
                    <input placeholder='Search for people and friends'/>
                </form>
                <ul>
                    <AccountFound avatar={userData.user.avatar}/>
                    <AccountFound avatar={userData.user.avatar}/>
                    <AccountFound avatar={userData.user.avatar}/>
                    <AccountFound avatar={userData.user.avatar}/>
                    <AccountFound avatar={userData.user.avatar}/>
                </ul>
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


function AccountFound (props) {
    const avatar = props.avatar;
    const userName = 'Teste';
    const following = true;   // isso vai ter que vir de algum contexto?

    return (
        <li>
            <img src={avatar}/>
            <p>{userName}</p>
            {following && <span>following</span>}
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
    align-self: ${ props => props.searchDisplay? 'baseline' : 'center'};
    background: #E7E7E7;
    border-radius: 8px;
    font: 18px 'Lato', sans-serif;
    width: 500px;

    form {
        align-self: center;
    }
    input {
        background: #FFF;
        border-radius: 8px;
        color: #E7E7E7;
        height: 45px;
        padding-left: 20px;
        width: 100%;
    }

    ul {
        padding: 15px 20px;

        img {
            border-radius: 50%;
            height: 35px;
            width: 35px;
        }

        li {
            display: flex;
            align-items: center;
        }
        li:not(last-child) {
            margin-bottom: 10px;
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

