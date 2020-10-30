import React, {useContext, useState} from 'react';
import styled from 'styled-components'
import {IoIosArrowDown} from 'react-icons/io';
import UserContext from '../contexts/UserContext'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import {media} from '../components/SmallerComponents';



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
                        <Link to='/my-posts'>My posts</Link>
                        <Link to='/'>My likes</Link>
                        <Link to='/' onClick={ () => setUserData({...{}})}>Logout</Link>
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
    padding: 0 30px; 
    position: fixed;
    top: 0;

    img {
        height: 50px;
        width: 50px;
        border-radius: 50%;
    }

    ${media} {
        padding: 0 20px;

        img {
            height: 40px;
            width: 40px;
        }
    }
`;

const Linkr = styled.p `
    color: white;
    font: 700 3.1rem 'Passion One', cursive;
    letter-spacing: 0.05rem;
`;



const Menu = styled.div`
    align-items: center;
    position: relative;
    display: flex;
    color: #FFF;
    margin-right: 10px;

    div {
        font-size: 40px;
        margin-right: 5px;
        transform: ${props => props.rotate};
    }

    nav {
        display:flex;
        flex-direction:column;
        font: 700 20px 'Lato', sans-serif;
        top: 50px;
        position: absolute;
        background: #151515;
        border-bottom-left-radius: 25px;
        width: 170px;
        right: -40px;
        opacity: ${props => props.opacity};
        text-align: center;
        transition: 400ms ease;
        padding: 20px;
        transform: ${props => props.translate};
    }

    a {
        padding: 10px;
    }

    ${media} {

        div {
            font-size: 20px;
        }

        nav {
            font-size: 14px;
            padding: 10px;
            right: -30px;
            width: 130px;

            a {
                padding: 5px;
            }
        }
    }

`;