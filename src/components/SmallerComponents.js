import React from 'react';
import styled from 'styled-components';

export const media = '@media (max-width: 800px)';

export function Loading () {

    return (
        <LoadingWrapper>
            <img src='/images/loading.gif' />
            <p>Loading, please wait :)</p>
        </LoadingWrapper>
    );
}

export function CurrentPage (props) {

    return (
        <CurrentPageWrapper>
            <div>
                {props.children}
            </div>
        </CurrentPageWrapper>
    );
}

export function PostsListContainer (props) {

    return (
        <PostsListWrapper>
            {props.children}
        </PostsListWrapper>
    );
}

const LoadingWrapper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-top: 100px;
    width: 100vw;

    p {
        color: #FFF;
        font: 500 24px 'Passion One', cursive;
        margin-top: 10px;
    }
`;

const CurrentPageWrapper = styled.section`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 70px;
    width: 100%;

    & > div > div {
        display: flex;
    }

    h1 {
        color: #FFF;
        font: 700 40px 'Oswald', sans-serif;
        margin: 50px 0;
    }

    ${media} {
        h1 {
            font-size: 30px;
            margin: 15px;
        }

        & > div {
            width: 100vw;
        }
    }
`;

const PostsListWrapper = styled.main`
    align-items: center;
    color: #FFF;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-right: 30px;
`;