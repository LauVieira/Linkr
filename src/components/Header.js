import React, { useContext, useState } from 'react';
import styled from 'styled-components'
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { media } from '../components/SmallerComponents';
import UserContext from '../contexts/UserContext'

export default function Header () {
    const [ OpenMenu, SetOpenMenu ] = useState(false);
    const { userData, setUserData } = useContext(UserContext);

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
    align-items: center;
    background-color: #151515;
    display: flex;
    height: 70px;
    justify-content: space-between;
    left: 0;
    padding: 0 30px; 
    position: fixed;
    top: 0;
    width: 100%;

    img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
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
    color: #FFF;
    display: flex;
    margin-right: 10px;
    position: relative;

    div {
        font-size: 40px;
        margin-right: 5px;
        transform: ${props => props.rotate};
    }

    nav {
        background: #151515;
        border-bottom-left-radius: 25px;
        display:flex;
        flex-direction:column;
        font: 700 20px 'Lato', sans-serif;
        opacity: ${props => props.opacity};
        padding: 20px;
        position: absolute;
        right: -40px;
        text-align: center;
        top: 50px;
        transition: 400ms ease;
        transform: ${props => props.translate};
        width: 170px;
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