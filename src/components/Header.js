import React, {useContext, useState} from 'react';
import styled from 'styled-components'
import {IoIosArrowUp} from 'react-icons/io'; //posso fazer com um só e rotacionar ao clicar
import {IoIosArrowDown} from 'react-icons/io';
import UserContext from '../contexts/UserContext'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';



export default function Header () {
    const {userData} = useContext(UserContext);
    let history = useHistory();
    console.log(userData);
    const [OpenMenu,SetOpenMenu] = useState(false);
    console.log(userData);


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
                    <nav>
                         <Link to='/'>My posts</Link>
                        <Link to='/'>My likes</Link>
                        <Link to='/'>Logout</Link>
                    </nav>
                </Menu>
                <img src={userData.avatar}/>
            </div>
        </StyledHeader>
        
    );
}

const StyledHeader = styled.div `
    width: 100%;
    height: 4.5rem;
    background-color: #151515;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem 0 2rem; 

    img {
        altura: 50px;
        largura: 50px;
        raio da borda: 50%;
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
    position: relative;
    color: #FFF;
    font-size: 3vw;
    margin-right: 10px;
    div{
        transform: ${props => props.rotate};
    }
    nav {
        display:flex;
        flex-direction:column;
        font-size: 1.5vw;
        top:50px;
        position: absolute;
        background:#151515;
        border-bottom-left-radius: 25px;
        font-family:'Lato', sans-serif;
        width: 200px;
        right: -63px;
        opacity: ${props => props.opacity};
        transition: 400ms ease;
        padding: 20px;
        transform: ${props => props.translate};
    }
    a{
        padding: 10px;
    }
    `