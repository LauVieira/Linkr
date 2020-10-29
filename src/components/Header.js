import React, {useContext, useState} from 'react';
import styled from 'styled-components'
import {IoIosArrowDown} from 'react-icons/io';
import UserContext from '../contexts/UserContext'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



export default function Header () {
    const {userData,setUserData} = useContext(UserContext);
    let history = useHistory();
    const [OpenMenu,SetOpenMenu] = useState(false);


    return (
        <StyledHeader>

            <Linkr> 
                linkr
            </Linkr>

            <div onClick={() => SetOpenMenu(!OpenMenu)}>
                <Menu
                 opacity={OpenMenu? '1':'0'}
                 translate={OpenMenu? 'translateY(0)':'translateY(-20px)'}
                 rotate={OpenMenu? 'rotate(180deg)':'rotate(0)'}
                >
                    <div><IoIosArrowDown  /></div>
                    <img src={userData.user.avatar}/>
                    <nav>
                        <Link to='/'>My posts</Link>
                        <Link to='/'>My likes</Link>
                        <Link to='/' onClick={ () => setUserData([...[]])}>Logout</Link>
                    </nav>
                </Menu>
                
            </div>
        </StyledHeader>
        
    );
}

const StyledHeader = styled.div `
    width: 100%;
    height: 70px;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    left: 0;
    align-items: center;
    padding: 0 2rem 0 2rem; 
    position: fixed;
    top: 0;

    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }
`;

const Linkr = styled.div `
    width: 10%;
    font-size: 3.1rem;
    color: white;
    font-family: 'Passion One', cursive;
    font-weight: 700;
    letter-spacing: 0.05rem;
    
`;



const Menu = styled.div`
    align-items: center;
    position: relative;
    display: flex;
    color: #FFF;
    font-size: 3vw;
    margin-right: 10px;

    div {
        transform: ${props => props.rotate};
    }

    nav {
        display:flex;
        flex-direction:column;
        font: 700 1.5vw 'Lato', sans-serif;
        top:50px;
        position: absolute;
        background:#151515;
        border-bottom-left-radius: 25px;
        width: 200px;
        right: -63px;
        opacity: ${props => props.opacity};
        transition: 400ms ease;
        padding: 20px;
        transform: ${props => props.translate};
    }

    a {
        padding: 10px;
    }
`;